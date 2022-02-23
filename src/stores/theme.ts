import { writable } from 'svelte/store';

export const darkTheme = writable(
    JSON.parse(sessionStorage.getItem('optimade_darkTheme'))
);
darkTheme.subscribe((val) => sessionStorage.setItem('optimade_darkTheme', val));

const darkMedia = window.matchMedia('(prefers-color-scheme: dark)')

function handleMediaChange(event: { matches: boolean; }) {
    darkTheme.set(event.matches)
}
// handleMediaChange(darkMedia)
darkMedia.addEventListener('change', handleMediaChange);
