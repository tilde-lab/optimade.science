import { Optimade } from 'optimade';

import prefetched from 'optimade/dist/prefetched.json';

import { providersUrl, corsProxyUrl } from '@/config';

const optimade = new Optimade({ providersUrl, corsProxyUrl, });

// Add an API version to a provider. We use it in Avatar.svelte.
prefetched.providers && Object.keys(prefetched.providers).forEach((key) => {
	prefetched.providers[key].attributes.api_version = prefetched.apis[key][0].attributes.api_version
})

optimade.providers = prefetched.providers;
optimade.apis = prefetched.apis;

export default optimade;

export const getJSON = Optimade.getJSON;

export type { Types } from 'optimade';