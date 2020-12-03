import asyncable from 'svelte-asyncable';
import { query } from 'svelte-pathfinder';
import debounce from 'debounce-promise';

import type { Types } from 'optimade';

import optimade from '@/services/optimade';
import providers from '@/stores/providers';

export default asyncable(debounce(async ($query) => {
    if (!$query.filter) return [];

    const $providers: Types.Provider[] = (await providers.get()).filter
        (provider => {
            if (!provider) return false;
            return $query.providers.includes(provider.id);
        });

    const results = await optimade.getStructuresAll($providers, $query.filter) || [];

    return results.sort((a, b) => {
        if ((a[0] && a[0].length) && (!b[0] || !b[0].length)) return -1;
        if ((!a[0] || !a[0].length) && (b[0] && b[0].length)) return 1;
        return 0;
    });
}), null, [query]);