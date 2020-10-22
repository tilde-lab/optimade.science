import { writable } from 'svelte/store';
import asyncable from 'svelte-asyncable';
import debounce from 'debounce-promise';

import providers, { selected } from '@/stores/providers';

export const filter = writable('');

export default asyncable(debounce(async ($providers, $selected, $filter) => {
    if (!$filter) return [];
    const providers = (await $providers).filter(p => $selected.includes(p.id));
    const results = providers.map(provider => [provider, $filter]);

    return new Promise(resolve => setTimeout(() => resolve(results), 1000));
}, 1000), null, [providers, selected, filter]);