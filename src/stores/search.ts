import asyncable from 'svelte-asyncable';
import { query } from 'svelte-pathfinder';
import { getStructures } from 'optimade';
import type { Types } from 'optimade';

import { apis } from '@/stores/providers';

import { allSettled, debounce } from '@/helpers/async';

export default asyncable(debounce(async ($apis, $query) => {
    if (!$query.filter) return [];

    const apis = (await $apis).filter(api => {
        if (!api) return false;
        return $query.providers.includes(api.provider.id);
    });
    console.log('apis', apis.length);
    return Promise.all(apis.map(api => allSettled([
        getStructures(api.data, $query.filter),
        Promise.resolve(api.provider)
    ])));

}, 1000), null, [apis, query]);