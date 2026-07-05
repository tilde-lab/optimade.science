import { asyncable } from 'svelte-asyncable';

import type { Asyncable } from 'svelte-asyncable';
import type { Types } from 'optimade';

import optimade from '@/services/optimade';
import { corsProxyUrl, lsCustomProviderKey } from '@/config';

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

async function probeQueryLimits(base_url: string): Promise<number[] | undefined> {
    const url = `${base_url}/structures?filter=chemical_formula_anonymous%3D%22A2B%22&page_limit=500`;
    try {
        const res = await fetchJson(url);
        if (res && res.errors) {
            const detail = Array.isArray(res.errors) ? res.errors[0]?.detail ?? '' : (res.errors as any).detail ?? '';
            const matches = String(detail).match(/\d+/g);
            if (matches) {
                const limits = matches.map(Number).filter((n) => n < 500);
                if (limits.length) return limits;
            }
        }
    } catch {
        // query_limits are optional; an unprovable limit is not fatal.
    }
    return undefined;
}

function withBaseUrl(api: Types.Api, base_url: string, api_version: string): Types.Api {
    return {
        ...api,
        attributes: {
            ...api.attributes,
            api_version,
            available_api_versions: [{ version: api_version, url: base_url }],
        },
    };
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

const initial = readStored();
if (initial) {
    if (!optimade.providers) {
        optimade.providers = {};
    }
    optimade.providers[CUSTOM_ID] = initial.provider;
    optimade.apis[CUSTOM_ID] = (initial.apis || []).map((api) => withBaseUrl(api, initial.provider.attributes.base_url as string, api.attributes.api_version));
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
    const prevProvider = optimade.providers && optimade.providers[CUSTOM_ID];
    const prevApis = optimade.apis ? optimade.apis[CUSTOM_ID] : undefined;
    if (optimade.apis) {
        optimade.apis[CUSTOM_ID] = [];
    }
    if (optimade.providers && optimade.providers[CUSTOM_ID]) {
        delete optimade.providers[CUSTOM_ID];
    }

    try {
        const { info } = await probeInfo(base_url);
        const api = pickApiFromInfo(info);

        const api_version = (info.meta && info.meta.api_version) || (api.attributes && api.attributes.api_version);
        const query_limits = await probeQueryLimits(base_url);

        const apiWithBaseUrl = withBaseUrl(api, base_url, api_version);

        provider.attributes = {
            ...provider.attributes,
            api_version,
            query_limits,
        };

        if (!optimade.providers) {
            optimade.providers = {};
        }
        optimade.providers[CUSTOM_ID] = provider;
        optimade.apis[CUSTOM_ID] = [apiWithBaseUrl];
    } catch (err) {
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
