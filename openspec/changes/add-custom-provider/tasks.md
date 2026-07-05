## 1. Config & Constants

- [x] 1.1 Add `lsCustomProviderKey = 'optimade-custom-providers'` constant to `src/config.ts` (mirrors existing `lsProviderKey`).
- [x] 1.2 Re-export `Types` and the `optimade` singleton's `addProvider` capability from `src/services/optimade.ts` if not already accessible (verify the singleton is the one imported by the modal).

## 2. Custom Providers Store

- [x] 2.1 Create `src/stores/custom-providers.ts` exporting a `customProviders` asyncable (pattern from `src/stores/modules.ts`) that reads the persisted `Types.Provider` definition from `localStorage[lsCustomProviderKey]` and writes back on set.
- [x] 2.2 Add an `addCustomProvider(url: string)` action that: builds a `Types.Provider` with `id: 'custom'`, `type: 'links'`, `attributes: { name: 'custom', description: '', base_url: url, homepage: null }`; calls `optimade.addProvider(provider)`; on success sets the asyncable to the enriched `optimade.providers['custom']` (which triggers the localStorage write callback); on failure propagates the error so the modal can surface it.
- [x] 2.3 On store init (module load), if a persisted definition exists, hydrate `optimade.providers['custom']` and `optimade.apis['custom']` synchronously from the persisted value so the tile renders without a network probe.

## 3. Merge Into Providers Store

- [x] 3.1 In `src/stores/providers.ts`, update the `providers` asyncable resolver to merge the re-hydrated custom provider (read from `localStorage[lsCustomProviderKey]`, or from `optimade.providers['custom']` after hydration) into the array returned by `Object.values(optimade.providers)`, ensuring `custom` appears at most once and only when a definition exists.
- [x] 3.2 Verify `providersSync` (`syncable(providers, [])`) reflects the merged list with no further changes.
- [x] 3.3 Verify `retrieveProviderSelections` (`src/stores/providers.ts:29-40`) keeps the `custom` id when it is present in the URL and a custom definition exists, and drops it when no definition exists (matching existing unknown-id behavior).

## 4. Add Provider Modal UI

- [x] 4.1 Create `src/views/AddProviderModal.svelte` using the `src/layouts/Modal.svelte` wrapper with a local `let open = false` (pattern from `src/views/Header.svelte:10-16`).
- [x] 4.2 Render a single required text input for the base URL plus a submit button; no name/description/id inputs.
- [x] 4.3 On submit: validate non-empty URL (inline error if empty); call `addCustomProvider(url)` from the custom-providers store; on success close the modal and select the `custom` provider by toggling it into `$query.params.providers` (reuse the existing `onProviderSelect` logic from `Providers.svelte`); on failure keep the modal open and display the error message.
- [x] 4.4 Expose `bind:open` so the parent `Providers.svelte` can open the modal.

## 5. "use new" Tile in Providers View

- [x] 5.1 In `src/views/Providers.svelte`, after the existing `{#each items}` loop, render a trailing "use new" tile: a `<label>` wrapping an `Avatar custom name="use new" id="use-new" len={4} size="lg"` (same `Avatar` props as builtin tiles) with `on:click` setting the modal's `open = true`.
- [x] 5.2 Mount `<AddProviderModal bind:open />` in `Providers.svelte` and wire the "use new" tile click to open it.
- [x] 5.3 Confirm the "use new" tile is not part of the `items` array and does not affect selection/search logic.

## 6. Selection & URL Integration

- [x] 6.1 Verify selecting the `custom` provider tile updates `$query.params.providers` to include `custom` and serializes to `?providers=...custom...` (separator array format).
- [x] 6.2 Verify the selection persists to `localStorage[lsProviderKey]` (`optimade-providers`) as part of the id array via the existing `query.subscribe` mirror in `src/stores/providers.ts:42-44`.
- [x] 6.3 Verify reloading with `?providers=custom` and a stored definition keeps `custom` selected; reloading with `?providers=custom` and no stored definition drops the id (no error).

## 7. Edge Cases & Hardening

- [x] 7.1 Ensure re-adding (submitting the modal a second time with a different URL) overwrites the single `custom` entry rather than creating duplicates.
- [x] 7.2 Ensure `addProvider` failures (network, CORS, non-OPTIMADE response) do not write to localStorage and do not close the modal.
- [x] 7.3 Ensure an empty URL submission is rejected with an inline validation message and does not call `addProvider`.

## 8. Verification

- [x] 8.1 Run `npm run check` (svelte-check) and resolve any type errors in new/modified files.
- [x] 8.2 Run `npm run lint` and resolve lint errors in `src/**/*.{ts,svelte}`.
- [x] 8.3 Run `npm run format` to normalize formatting.
- [ ] 8.4 Run `npm run dev` and manually verify: "use new" tile appears; modal opens; submitting a valid OPTIMADE base URL adds and selects the `custom` tile; reload preserves the tile and selection; reload without definition drops an orphan `?providers=custom`; a failed URL shows an error and keeps the modal open.

## 9. Bugfix: providers asyncable not reactive to custom-provider additions

- [x] 9.1 Wire the `customProviders` asyncable as a dependency of the `providers` asyncable (third `asyncable(getter, setter, stores)` argument) so that calling `customProviders.set(...)` re-resolves the `providers` store and `providersSync` / `Providers.svelte` re-render the new tile. Previously the getter had no reactive dependencies, so mutations to `optimade.providers['custom']` never triggered a re-render.
- [x] 9.2 Ensure `hasCustomDefinition` is exported from `src/stores/custom-providers.ts` (moved out of `src/stores/providers.ts`) to avoid duplicate definition.
- [x] 9.3 On re-add, clear `optimade.apis['custom']` and `optimade.providers['custom']` before calling `addProvider` so stale api entries do not accumulate.
- [x] 9.4 On failed re-add, restore the previous custom provider state instead of destroying a working one.
- [x] 9.5 Move the "use new" tile into the same `Grid` as the builtin tiles (trailing sibling after the `{#each}`), per design decision 6, instead of a separate `Grid` row.