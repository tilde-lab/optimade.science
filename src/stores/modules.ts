import { derived } from 'svelte/store';
import asyncable from 'svelte-asyncable';

import { getJSON } from '@/services/optimade';
import { supportedModulesUrl, lsModulesKey } from '@/config';

export const builtinModules = asyncable(() => getJSON(supportedModulesUrl), null);

export const builtinModulesSync = derived(builtinModules, ($builtinModules, set) => {
    $builtinModules.then(set);
}, []);

export default asyncable(async ($builtinModules) => {

    const builtinModules = await $builtinModules;

    const localModules = JSON.parse(localStorage.getItem(lsModulesKey) || '[]');

    return localModules.concat(builtinModules.filter(m => !localModules.includes(m)));
}, (modules = []) => {
    localStorage.setItem(lsModulesKey, JSON.stringify(modules));
}, [builtinModules]);