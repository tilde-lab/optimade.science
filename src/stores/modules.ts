import { derived } from 'svelte/store';
import asyncable from 'svelte-asyncable';

import type { Readable } from 'svelte/store';
import type { Asyncable } from '@/types/asyncable';

import { getJSON } from '@/services/optimade';
import { supportedModulesUrl, lsModulesKey } from '@/config';

export const builtinModules: Asyncable<string[]> = asyncable(() => getJSON(supportedModulesUrl), null);

export const builtinModulesSync: Readable<string[]> = derived(builtinModules, ($builtinModules, set) => {
    $builtinModules.then(set);
}, []);

const modules: Asyncable<string[]> = asyncable(async ($builtinModules) => {

    const builtinModules = await $builtinModules;

    const localModules = JSON.parse(localStorage.getItem(lsModulesKey) || '[]');

    return localModules.concat(builtinModules.filter(m => !localModules.includes(m)));
}, (modules = []) => {
    localStorage.setItem(lsModulesKey, JSON.stringify(modules));
}, [builtinModules]);

export default modules;