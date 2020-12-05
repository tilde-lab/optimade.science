import { derived } from 'svelte/store';
import asyncable from 'svelte-asyncable';
import { query } from 'svelte-pathfinder';
import type { Types } from 'optimade';

import optimade from '@/services/optimade';

import { lsProviderKey } from '@/config';

const providers = asyncable(async (): Promise<Types.Provider[]> => {
    const providers: Types.Provider[] = Object.values(await optimade.getProviders());

    retrieveProviderSelections(providers);

    return providers;
}, null);

export default providers;

export const ready = derived(providers, ($providers, set) => {
    $providers.then(() => set(true));
}, false);

function retrieveProviderSelections(providers: Types.Provider[]) {

    const ids = JSON.parse(localStorage.getItem(lsProviderKey) || '[]') ||
        providers.map(p => p.id);

    query.update($query => {
        $query.providers = $query.providers && $query.providers.length ?
            $query.providers.filter(id => ids.includes(id)) :
            ids;
        return $query;
    });
}

query.subscribe($query => {
    $query.providers && localStorage.setItem(lsProviderKey, JSON.stringify($query.providers));
});