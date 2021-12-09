import { derived, get } from 'svelte/store';
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

type StructuresByProviders = Array<Array<[Types.StructuresResponse[], Types.Provider]>>;

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
                set(results);
            });
    }, []);

export const searchAll: Asyncable<StructuresByProviders> = asyncable<[Readable<StructuresByProviders>], StructuresByProviders>(($search) => Promise.all($search), null, [search]);

export const getTotal: Asyncable<number> = asyncable<[Readable<StructuresByProviders>], number>(async ($search) => {
    const fetchedProviders = await Promise.all($search);
    const filteredProviders = fetchedProviders.filter(
        ([apis, _provider]: [Types.StructuresResponse[], Types.Provider]) =>
            apis?.some((a) => !(a instanceof Error) && a?.data.length)
    );
    const returnedTotals = filteredProviders.reduce<number[]>(
        (acc: number[], [apis, _provider]: [Types.StructuresResponse[], Types.Provider]) => {
            const returned = apis[0].meta.data_returned;
            //  / (apis[0].meta.data_returned > 10000 ? 100 : 1);
            acc = acc.length ? [...acc, returned] : [returned];
            return acc;
        },
        []
    );
    return returnedTotals.length ? Math.max(...returnedTotals) : 0;
}, 0, [search]);

const page = get(query).params.page || 1;
const maxMin = (max: number, min: number, val: number) => Math.min(max, Math.max(min, val));

export const total = derived<[Writable<StringParams>, Readable<Param[]>, Asyncable<number>], number>(
    [query, selectedProviders, getTotal],
    ([$query, $selectedProviders, $getTotal], set) => {
        if (!$query.params.filter || !$selectedProviders) return set(0);
        else if (page === $query.params.page || $selectedProviders) $getTotal.then((result) => {
            console.log(result, maxMin(10000, 1, result));
            set(maxMin(10000, 1, result));
        });
    }, 0);

export default search;