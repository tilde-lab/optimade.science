import asyncable from 'svelte-asyncable';
import { query } from 'svelte-pathfinder';

import { getProviders } from 'optimade';

export default asyncable(async () => {
    const { data: providers } = await getProviders();
    const ids = providers.map(p => p.id);
    query.update($query => {
        $query.providers = $query.providers && $query.providers.length ?
            $query.providers.filter(id => ids.includes(id)) :
            ids;
        return $query;
    });
    return providers;
});