import { tick } from 'svelte';
import { derived } from 'svelte/store';
import { asyncable, syncable } from 'svelte-asyncable';
import { query } from 'svelte-pathfinder';

import type { Readable } from 'svelte/store';
import type { Types } from 'optimade';
import type { Asyncable } from 'svelte-asyncable';
import type { Param } from 'svelte-pathfinder';

import optimade from '@/services/optimade';

import { lsProviderKey } from '@/config';

const providers: Asyncable<Types.Provider[]> = asyncable(async (): Promise<Types.Provider[]> => {
    const providers: Types.Provider[] = Object.values(optimade.providers || (await optimade.getProviders()));

    retrieveProviderSelections(providers);

    return providers;
}, null);

export default providers;

export const providersSync: Readable<Types.Provider[]> = syncable(providers, []);

export const selectedProviders: Readable<Param[]> = derived(query, ($query) => getSelectedProvidersIds($query.params.providers), []);

async function retrieveProviderSelections(providers: Types.Provider[]) {
    // move next operations to the next tick to be sure all changes already applied
    await tick();

    const ids = localStorage[lsProviderKey] ? JSON.parse(localStorage.getItem(lsProviderKey) as string) : providers.map((p) => p.id);

    query.update(($query) => {
        const selectedIds = getSelectedProvidersIds($query.params.providers);
        $query.params.providers = selectedIds.length ? selectedIds.filter((id) => ids.includes(id)) : ids;
        return $query;
    });
}

query.subscribe(($query) => {
    $query.params.providers && localStorage.setItem(lsProviderKey, JSON.stringify($query.params.providers));
});

function getSelectedProvidersIds(providers: Param) {
    return providers ? (Array.isArray(providers) ? providers : [providers]) : [];
}
