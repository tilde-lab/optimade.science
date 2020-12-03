import { Optimade } from 'optimade';

import { providersUrl, corsProxyUrl } from '@/config';

export default new Optimade({ providersUrl, corsProxyUrl, });

export const getJSON = Optimade.getJSON;