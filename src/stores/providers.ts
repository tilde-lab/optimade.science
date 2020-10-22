import { writable } from 'svelte/store';
import asyncable from 'svelte-asyncable';

import { getProviders } from 'optimade';

export const selected = writable([]);

export default asyncable(async () => {
    const { data: providers } = await getProviders();
    const ids = providers.map(p => p.id);
    selected.update($selected => $selected.length ? $selected.filter(id => ids.includes(id)) : ids);
    return providers;
});