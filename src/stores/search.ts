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

type StructuresByProviders = Array<Array<[Types.ApisMap, Types.Provider]>>;

const getStructuresAll = debounce((providers: string[], filter: string, page: number = 0, limit: number, batch: boolean) => {
    return optimade.getStructuresAll(providers, filter, page, limit, batch) || [];
}, searchDelay);

const search = derived<[Writable<StringParams>, Readable<Param[]>], StructuresByProviders>(
    [query, selectedProviders],
    ([$query, $selectedProviders], set) => {
        if (!$query.params.filter) return set([]);
        providers.get()
            .then(() => getStructuresAll(
                $selectedProviders,
                $query.params.filter,
                $query.params.page,
                $query.params.limit, false))
            .then((results = []) => {
                console.log(results);
                set(results);
            });
    }, []);

export const searchAll: Asyncable<StructuresByProviders> = asyncable<[Readable<StructuresByProviders>], StructuresByProviders>(($search) => Promise.all($search), null, [search]);
export const getTotal: Asyncable<number> = asyncable<[Readable<StructuresByProviders>], StructuresByProviders>(async ($search) => {
    const fetchedProviders = await Promise.all($search);
    const filteredProviders = fetchedProviders.filter(
        ([apis, provider]) =>
            apis &&
            apis.some((a) => !(a instanceof Error) && a?.data.length)
    );
    const returnedTotals: Array<number> = filteredProviders.reduce(
        (acc: number[], [apis, _provider]) => {
            const returned =
                apis[0].meta.data_returned /
                (apis[0].meta.data_returned > 10000 ? 100 : 1);
            acc = acc.length ? [...acc, returned] : [returned];
            return acc;
        },
        []
    );
    return returnedTotals.length ? Math.max(...returnedTotals) : 0;
}, null, [search]);

export default search;