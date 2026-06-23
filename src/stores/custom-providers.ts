import { asyncable } from 'svelte-asyncable';

import type { Asyncable } from 'svelte-asyncable';
import type { Types } from 'optimade';

import optimade from '@/services/optimade';
import { lsCustomProviderKey } from '@/config';

const CUSTOM_ID = 'custom';

interface CustomProviderRecord {
    provider: Types.Provider;
    apis: Types.Api[];
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

export async function addCustomProvider(url: string): Promise<Types.Provider> {
    const base_url = url.trim();
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

    await optimade.addProvider(provider);

    const stored = optimade.providers && optimade.providers[CUSTOM_ID];
    const apiEntry = optimade.apis[CUSTOM_ID];
    const enriched = stored && apiEntry && apiEntry.length > 0 && stored.attributes.api_version;

    if (!stored || !enriched) {
        // addProvider swallows internal errors; treat a missing api_version / apis
        // entry as a registration failure so the modal can surface it and we do
        // not persist an unusable definition.
        if (optimade.providers) {
            delete optimade.providers[CUSTOM_ID];
        }
        delete optimade.apis[CUSTOM_ID];
        customProviders.set(null);
        throw new Error('Could not reach an OPTIMADE API at that URL. Check the URL and that the server allows CORS.');
    }

    customProviders.set(stored);
    return stored;
}
