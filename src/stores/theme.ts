import { writable } from 'svelte/store';

const darkMedia = window.matchMedia('(prefers-color-scheme: dark)')

export const darkTheme = writable(
    JSON.parse(sessionStorage.getItem('optimade_darkTheme') as string) ?? darkMedia.matches
);
darkTheme.subscribe((val) => sessionStorage.setItem('optimade_darkTheme', val));


function handleMediaChange(event: { matches: boolean; }) {
    darkTheme.set(event.matches)
}
// handleMediaChange(darkMedia)
darkMedia.addEventListener('change', handleMediaChange);
