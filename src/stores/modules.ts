import { asyncable, syncable } from 'svelte-asyncable';

import type { Readable } from 'svelte/store';
import type { Asyncable } from 'svelte-asyncable';

import { getJSON } from '@/services/optimade'; // now replaced by simple fetch() for ignore CORS issue
import { supportedModulesUrl, lsModulesKey } from '@/config';

export const builtinModules: Asyncable<string[]> = asyncable(() => fetch(supportedModulesUrl).then(async (res) => await res.json()), null);

export const builtinModulesSync: Readable<string[]> = syncable(builtinModules, []);

const modules: Asyncable<string[]> = asyncable(
    async ($builtinModules) => {
        const builtinModules = (await $builtinModules) as string[];

        const localModules = JSON.parse(localStorage.getItem(lsModulesKey) || '[]');

        return localModules.concat(builtinModules.filter((m) => !localModules.includes(m)));
    },
    (modules = []) => {
        localStorage.setItem(lsModulesKey, JSON.stringify(modules));
    },
    [builtinModules]
);

export default modules;
