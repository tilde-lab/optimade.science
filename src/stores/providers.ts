import { tick } from 'svelte';
import { derived } from 'svelte/store';
import asyncable from 'svelte-asyncable';
import { query } from 'svelte-pathfinder';

import type { Readable } from 'svelte/store';
import type { Types } from 'optimade';
import type { Asyncable } from '@/types/asyncable';

import optimade from '@/services/optimade';

import { lsProviderKey } from '@/config';

const providers: Asyncable<Types.Provider[]> = asyncable(async (): Promise<Types.Provider[]> => {
    const providers: Types.Provider[] = Object.values(optimade.providers || await optimade.getProviders());

    retrieveProviderSelections(providers);

    return providers;
}, null);

export default providers;

export const ready: Readable<boolean> = derived(providers, ($providers, set) => {
    $providers.then(() => set(true), () => set(false));
}, false);

async function retrieveProviderSelections(providers: Types.Provider[]) {

    // move next operations to the next tick to be sure all changes already applied
    await tick();

    const ids = localStorage[lsProviderKey] ?
        JSON.parse(localStorage.getItem(lsProviderKey)) :
        providers.map(p => p.id);

    query.update($query => {
        if (typeof $query.providers === 'string') {
            $query.providers = [$query.providers];
        }

        $query.providers = $query.providers && $query.providers.length ?
            $query.providers.filter(id => ids.includes(id)) :
            ids;
        return $query;
    });
}

query.subscribe($query => {
    $query.providers && localStorage.setItem(lsProviderKey, JSON.stringify($query.providers));
});