import { derived } from 'svelte/store';
import { asyncable } from 'svelte-asyncable';
import { query } from 'svelte-pathfinder';
import debounce from 'debounce-promise';

import optimade from '@/services/optimade';
import providers, { selectedProviders } from '@/stores/providers';
import { searchDelay } from '@/config';

import type { Param, StringParams } from 'svelte-pathfinder';
import type { Readable, Writable } from 'svelte/store';
import type { Types } from '@/services/optimade';
import type { Asyncable } from 'svelte-asyncable';

type StructuresByProviders = Array<Array<[Types.Structure, Types.Provider]>>;

const getStructuresAll = debounce((providers: string[], filter: string, batch: boolean) => {
    return optimade.getStructuresAll(providers, filter, batch) || [];
}, searchDelay);

const search = derived<[Writable<StringParams>, Readable<Param[]>], StructuresByProviders>(
    [ query, selectedProviders ], 
    ([ $query, $selectedProviders ], set) => {
        if (!$query.params.filter) return set([]);
        providers.get().then(() => getStructuresAll($selectedProviders, $query.params.filter, false)).then((results = []) => {
            console.log(results);
            set(results);
        });
    }, 
    []
);

export const searchAll: Asyncable<StructuresByProviders> = asyncable<[Readable<StructuresByProviders>], StructuresByProviders>(($search) => Promise.all($search), null, [ search ]);

export default search;