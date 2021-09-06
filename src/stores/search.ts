import { asyncable } from 'svelte-asyncable';
import { query } from 'svelte-pathfinder';
import debounce from 'debounce-promise';

import optimade from '@/services/optimade';
import providers, { selectedProviders } from '@/stores/providers';
import { searchDelay } from '@/config';

import type { Types } from '@/services/optimade';
import type { Asyncable } from 'svelte-asyncable';

type StructuresByProviders = Array<Array<[Types.Structure, Types.Provider]>>;

const getStructuresAll = debounce((providers, filter) => {
    return optimade.getStructuresAll(providers, filter) || [];
}, searchDelay);

const search: Asyncable<StructuresByProviders> = asyncable(async ($query, $selectedProviders) => {
    if (!$query.params.filter) return [];

    await providers.get(); // just wait until providers loaded

    const results: StructuresByProviders = await getStructuresAll($selectedProviders, $query.params.filter);
    return results.sort((a, b) => {
        if ((a[0] && a[0].length) && (!b[0] || !b[0].length)) return -1;
        if ((!a[0] || !a[0].length) && (b[0] && b[0].length)) return 1;
        return 0;
    });
}, null, [query, selectedProviders]);
export default search;