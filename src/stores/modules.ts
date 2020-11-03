import asyncable from 'svelte-asyncable';

export default asyncable(async () => {
    return localStorage.getItem('optimade-modules') || [];
}, (modules) => {
    localStorage.setItem('optimade-modules', modules);
});