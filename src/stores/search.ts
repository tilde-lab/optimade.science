import asyncable from 'svelte-asyncable';
import debounce from 'debounce-promise';

import { query } from 'svelte-pathfinder';

import providers from '@/stores/providers';

export default asyncable(debounce(async ($providers, $query) => {
    if (!$query.filter) return [];

    const providers = (await $providers).filter(p => $query.providers.includes(p.id));
    const results = providers.map(provider => [provider, $query.filter]);

    return new Promise(resolve => setTimeout(() => resolve(results), 1000));
}, 1000), null, [providers, query]);