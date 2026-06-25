import { tick } from 'svelte';
import { derived } from 'svelte/store';
import { asyncable, syncable } from 'svelte-asyncable';
import { query } from 'svelte-pathfinder';

import type { Readable } from 'svelte/store';
import type { Types } from 'optimade';
import type { Asyncable } from 'svelte-asyncable';
import type { Param } from 'svelte-pathfinder';

import optimade from '@/services/optimade';
import customProviders, { hasCustomDefinition } from '@/stores/custom-providers';
import { lsProviderKey } from '@/config';

const providers: Asyncable<Types.Provider[]> = asyncable(
    async ($customProvider: Promise<Types.Provider | null>): Promise<Types.Provider[]> => {
        // The dependency is an asyncable, so its value arrives as a Promise.
        const customProvider = await $customProvider;

        // Ensure optimade.providers reflects the latest custom provider
        // (either hydrated on load or set by addCustomProvider). On first
        // run, customProvider is null and we may need to fetch providers.
        if (customProvider) {
            if (!optimade.providers) {
                optimade.providers = {};
            }
            optimade.providers['custom'] = customProvider;
        }

        const providers: Types.Provider[] = Object.values(optimade.providers || (await optimade.getProviders()));

        // Ensure the hydrated custom provider (if any) is present in the merged
        // array even if optimade.providers was re-seeded from prefetched.json.
        if (optimade.providers && optimade.providers['custom'] && !providers.some((p) => p.id === 'custom')) {
            providers.push(optimade.providers['custom']);
        }

        retrieveProviderSelections(providers);

        return providers;
    },
    null,
    [customProviders]
);

export default providers;

export const providersSync: Readable<Types.Provider[]> = syncable(providers, []);

export const selectedProviders: Readable<Param[]> = derived(query, ($query) => getSelectedProvidersIds($query.params.providers), []);

async function retrieveProviderSelections(providers: Types.Provider[]) {
    // move next operations to the next tick to be sure all changes already applied
    await tick();

    const ids = localStorage[lsProviderKey] ? JSON.parse(localStorage.getItem(lsProviderKey) as string) : providers.map((p) => p.id);

    // Keep the `custom` id in the allowed set iff a custom provider definition
    // exists in localStorage, so a URL like ?providers=custom resolves correctly
    // across reloads and is dropped when the user has never added one.
    const allowedIds = hasCustomDefinition() && !ids.includes('custom') ? [...ids, 'custom'] : ids;

    query.update(($query) => {
        const selectedIds = getSelectedProvidersIds($query.params.providers);
        $query.params.providers = selectedIds.length ? selectedIds.filter((id) => allowedIds.includes(id)) : allowedIds;
        return $query;
    });
}

query.subscribe(($query) => {
    $query.params.providers && localStorage.setItem(lsProviderKey, JSON.stringify($query.params.providers));
});

function getSelectedProvidersIds(providers: Param) {
    return providers ? (Array.isArray(providers) ? providers : [providers]) : [];
}
