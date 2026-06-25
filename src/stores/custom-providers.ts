import { asyncable } from 'svelte-asyncable';

import type { Asyncable } from 'svelte-asyncable';
import type { Types } from 'optimade';

import optimade from '@/services/optimade';
import { corsProxyUrl, lsCustomProviderKey } from '@/config';

// Fetch JSON via the CORS proxy when the target origin would otherwise block
// browser requests. Mirrors Optimade.wrapUrl so custom providers reach the
// network through the same path as builtins. Uses plain fetch (not the
// library's getJSON, which sets a User-Agent header that browsers forbid).
function corsUrl(raw: string): string {
    if (!corsProxyUrl) return raw;
    return `${corsProxyUrl}/${raw.replace('://', '/').replace('//', '/')}`;
}

async function fetchJson(url: string): Promise<any> {
    const res = await fetch(corsUrl(url), { headers: { Accept: 'application/json' } });
    if (!res.ok) {
        let detail = `${res.status} ${res.statusText}`;
        try {
            const body = await res.json();
            if (body && body.errors) {
                detail = Array.isArray(body.errors) ? body.errors[0]?.detail ?? detail : (body.errors as any).detail ?? detail;
            }
        } catch {
            // ignore body parse failure; keep the status text
        }
        throw new Error(detail);
    }
    return await res.json();
}

// Normalise a user-supplied base URL: trim trailing slashes. We intentionally
// do NOT strip a trailing /v1 — some servers (e.g. gumar.tilde.pro) expose the
// API directly under /v1, while others serve /info at the root. The library's
// addProvider unconditionally appends /v1, which double-prefixes /v1/v1 for
// such servers and 404s; here we probe /info at the given URL and, if that
// fails, try the /v1 variant, so both shapes work.
function normaliseBaseUrl(url: string): string {
    return url.replace(/\/+$/, '');
}

async function probeInfo(base_url: string): Promise<{ info: Types.InfoResponse; usedUrl: string }> {
    const candidates = [base_url, `${base_url}/v1`];
    let lastErr: unknown;
    for (const candidate of candidates) {
        try {
            const info = await fetchJson(`${candidate}/info`);
            if (info && info.meta && info.meta.api_version) {
                return { info, usedUrl: candidate };
            }
        } catch (err) {
            lastErr = err;
        }
    }
    throw lastErr instanceof Error ? lastErr : new Error('No /info response from server');
}

function pickApiFromInfo(info: Types.InfoResponse): Types.Api {
    const { data, meta } = info;
    if (Array.isArray(data)) {
        const found = data.find((entry) => entry.attributes && entry.attributes.api_version === meta.api_version);
        if (found) return found;
        return data[0];
    }
    return data;
}

async function probeQueryLimits(base_url: string, api: Types.Api): Promise<number[] | undefined> {
    const apiVersionUrl = OptimadeApiVersionUrl(api);
    const formula = `chemical_formula_anonymous="A2B"`;
    const url = `${apiVersionUrl}/structures?filter=${formula}&page_limit=1000`;
    try {
        const res = await fetchJson(url);
        if (res && res.errors) {
            const detail = Array.isArray(res.errors) ? res.errors[0]?.detail ?? '' : (res.errors as any).detail ?? '';
            const matches = String(detail).match(/\d+/g);
            if (matches) {
                const limits = matches.map(Number).filter((n) => n < 1000);
                if (limits.length) return limits;
            }
        }
    } catch {
        // query_limits are optional; an unprovable limit is not fatal.
    }
    return undefined;
}

// Reimplemented locally because Optimade.apiVersionUrl is a static method on
// the library class and handles the available_api_versions shape used by some
// servers (object) vs others (array). Keeping a copy avoids relying on the
// optimade singleton's private helpers.
function OptimadeApiVersionUrl({ attributes: { api_version, available_api_versions } }: Types.Api): string {
    let url = (available_api_versions as any)[api_version];
    if (!url && Array.isArray(available_api_versions)) {
        const api = (available_api_versions as any[]).find(({ version }) => version === api_version);
        url = api && api.url;
    }
    return url;
}

const CUSTOM_ID = 'custom';

interface CustomProviderRecord {
    provider: Types.Provider;
    apis: Types.Api[];
}

function hasCustomDefinition(): boolean {
    try {
        return !!localStorage.getItem(lsCustomProviderKey);
    } catch {
        return false;
    }
}

function readStored(): CustomProviderRecord | null {
    try {
        const raw = localStorage.getItem(lsCustomProviderKey);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as CustomProviderRecord;
        return parsed && parsed.provider && parsed.provider.id === CUSTOM_ID && parsed.provider.attributes && parsed.provider.attributes.base_url
            ? parsed
            : null;
    } catch {
        return null;
    }
}

function writeStored(record: CustomProviderRecord | null) {
    if (record) {
        localStorage.setItem(lsCustomProviderKey, JSON.stringify(record));
    } else {
        localStorage.removeItem(lsCustomProviderKey);
    }
}

// Hydrate the optimade singleton synchronously on module load so the
// custom provider tile renders and is selectable without a network probe.
const initial = readStored();
if (initial) {
    if (!optimade.providers) {
        optimade.providers = {};
    }
    optimade.providers[CUSTOM_ID] = initial.provider;
    optimade.apis[CUSTOM_ID] = initial.apis || [];
}

const customProviders: Asyncable<Types.Provider | null> = asyncable(
    async (): Promise<Types.Provider | null> => {
        const record = readStored();
        return record ? record.provider : null;
    },
    (provider: Types.Provider | null = null) => {
        if (!provider) {
            writeStored(null);
            return;
        }
        writeStored({ provider, apis: optimade.apis[CUSTOM_ID] || [] });
    }
);

export default customProviders;

export const customId = CUSTOM_ID;

export { hasCustomDefinition };

export async function addCustomProvider(url: string): Promise<Types.Provider> {
    const base_url = normaliseBaseUrl(url.trim());
    if (!base_url) {
        throw new Error('Base URL is required');
    }

    const provider: Types.Provider = {
        type: 'links',
        id: CUSTOM_ID,
        attributes: {
            name: CUSTOM_ID,
            description: '',
            base_url,
            homepage: null,
        },
    };

    // Save the previous custom provider state so a failed re-add can restore it
    // instead of leaving the user with no custom provider at all.
    const prevProvider = optimade.providers && optimade.providers[CUSTOM_ID];
    const prevApis = optimade.apis ? optimade.apis[CUSTOM_ID] : undefined;
    if (optimade.apis) {
        optimade.apis[CUSTOM_ID] = [];
    }
    if (optimade.providers && optimade.providers[CUSTOM_ID]) {
        delete optimade.providers[CUSTOM_ID];
    }

    try {
        // Probe /info directly (with a /v1 fallback) rather than calling the
        // library's addProvider, which unconditionally appends /v1 and thus
        // produces /v1/v1/structures for servers like gumar.tilde.pro that
        // already include /v1 in their base URL.
        const { info } = await probeInfo(base_url);
        const api = pickApiFromInfo(info);

        // api_version is set from the /info meta (the server's declared
        // version). query_limits are probed best-effort via a sample query.
        const api_version = (info.meta && info.meta.api_version) || (api.attributes && api.attributes.api_version);
        const query_limits = await probeQueryLimits(base_url, api);

        provider.attributes = {
            ...provider.attributes,
            api_version,
            query_limits,
        };

        if (!optimade.providers) {
            optimade.providers = {};
        }
        optimade.providers[CUSTOM_ID] = provider;
        optimade.apis[CUSTOM_ID] = [api];
    } catch (err) {
        // Restore the previous custom provider (if any) on failure so a failed
        // re-add does not destroy a working one.
        if (optimade.providers) {
            if (prevProvider) {
                optimade.providers[CUSTOM_ID] = prevProvider;
            } else {
                delete optimade.providers[CUSTOM_ID];
            }
        }
        if (optimade.apis) {
            optimade.apis[CUSTOM_ID] = prevApis || [];
        }
        const message = err instanceof Error ? err.message : 'Could not reach an OPTIMADE API at that URL.';
        throw new Error(`Could not reach an OPTIMADE API at that URL: ${message}`);
    }

    customProviders.set(provider);
    return provider;
}
