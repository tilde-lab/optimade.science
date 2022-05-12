import { writable, get } from 'svelte/store';
import { media } from '@/stores/media';

export const darkTheme = writable(
    JSON.parse(sessionStorage.getItem('optimade_darkTheme') as string) ?? get(media).dark
);
darkTheme.subscribe((val) => sessionStorage.setItem('optimade_darkTheme', val));
