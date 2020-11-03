import asyncable from 'svelte-asyncable';
import { query } from 'svelte-pathfinder';

import { getProviders, getApis } from 'optimade';
import type { Types } from 'optimade';

import { allSettled } from '@/helpers/async';

export const providers = asyncable(async (): Promise<Types.ProvidersResponse> => {
    const providers: Types.ProvidersResponse = await getProviders();

    retrieveProviderSelections(providers.data);

    return providers;
}, null);

export const apis = asyncable(async ($providers: Promise<Types.ProvidersResponse>) => {
    const { data, meta }: Types.ProvidersResponse = await $providers;

    const ver = meta?.api_version?.charAt(0);

    return allSettled(data.map((provider: Types.Provider) => {
        return getApis(provider, ver ? `v${ver}` : '').then(apis => {
            apis.provider = provider;
            return apis;
        })
    }));
}, null, [providers]);

function retrieveProviderSelections(providers: Types.Provider[]) {
    const ids = localStorage.getItem('providers') || providers.map(p => p.id);

    query.update($query => {
        $query.providers = $query.providers && $query.providers.length ?
            $query.providers.filter(id => ids.includes(id)) :
            ids;
        return $query;
    });
}