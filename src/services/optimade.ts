import { Optimade } from 'optimade';
import nlp from 'optimade-mpds-nlp';

import prefetched from 'optimade/dist/prefetched.json';

import { providersUrl, corsProxyUrl } from '@/config';

const guesser = nlp();

export function guess(search: any) {
    if (search) {
        const result = guesser.guess(search);
        return guesser.to_optimade(result);
    }
}

const optimade = new Optimade({ providersUrl, corsProxyUrl });

optimade.providers = prefetched.providers;
optimade.apis = prefetched.apis;

export default optimade;

export const getJSON = Optimade.getJSON;

export type { Types } from 'optimade';
