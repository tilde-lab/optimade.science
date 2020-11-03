export { default as debounce } from 'debounce-promise';

export function allSettled(promises: Promise<any>[], catcher = e => null) {
    return Promise.all(promises.map(promise => promise.catch(catcher)));
}