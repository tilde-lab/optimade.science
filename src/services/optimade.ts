import { Optimade } from 'optimade';

import prefetched from 'optimade/dist/prefetched.json';

import { providersUrl, corsProxyUrl } from '@/config';

const optimade = new Optimade({ providersUrl, corsProxyUrl, });

optimade.providers = prefetched.providers;
optimade.apis = prefetched.apis;

export default optimade;

export const getJSON = Optimade.getJSON;

export type { Types } from 'optimade';