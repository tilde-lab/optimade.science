## Why

The web app surfaces only the data providers that are pre-listed in the `optimade` package's `prefetched.json` cache (sourced from the upstream OPTIMADE registry). A user who wants to query a provider that is not registered upstream — e.g. a private/institutional database, a local development server, or a newly deployed index — has no way to point the app at it. This forces every provider to be hard-coded into the prefetch build, blocking ad-hoc exploration. We need an in-app way to register a custom provider at runtime by supplying only a base URL.

## What Changes

- Add a new "use new" provider avatar tile, rendered alongside the existing provider tiles in `src/views/Providers.svelte`, that opens a modal for adding a custom data provider.
- Add an "Add custom provider" modal that collects a single required input — the provider's OPTIMADE base URL — and (optionally) skips name/description (defaulted). The provider id and `attributes.name` SHALL be `custom`.
- Register the user-supplied provider via the existing `Optimade.addProvider()` library method (`optimade-client/src/index.ts:19`), which probes `/info` and auto-fills `api_version` / `query_limits` / `apis`.
- Add a new Svelte store for custom providers, persisted to `localStorage`, following the `modules.ts` pattern (`src/stores/modules.ts`). Custom provider definitions survive page reloads.
- Merge custom providers into the existing `providers` asyncable so they appear in `providersSync` and the avatar grid automatically, and remain selectable via the existing `?providers=custom` URL parameter and `optimade-providers` localStorage selection state.
- The custom provider id `custom` is reflected in URL parameters (`?providers=custom`) and in the persisted selection, matching the existing id-based selection mechanism.

## Capabilities

### New Capabilities

- `custom-provider`: Adds the ability for a user to register a runtime, user-defined OPTIMADE data provider by base URL, with id/name `custom`, persisted across sessions and selectable alongside the builtin providers.

### Modified Capabilities

_(none — there are no existing specs in `openspec/specs/` to modify)_

## Impact

- **`src/config.ts`**: Add a new `lsCustomProviderKey` localStorage key constant (mirrors existing `lsProviderKey`).
- **`src/stores/providers.ts`**: Merge custom providers into the `providers` asyncable's resolver; ensure `retrieveProviderSelections` keeps the `custom` id when present in the URL but not in the builtin set.
- **`src/stores/custom-providers.ts`** (new): Asyncable store for user-added provider definitions, persisted to localStorage (pattern from `src/stores/modules.ts`).
- **`src/views/Providers.svelte`**: Render a trailing "use new" tile that opens the modal; existing tile-rendering loop already renders any `Types.Provider` in the merged list, so the custom provider appears automatically once added.
- **`src/views/AddProviderModal.svelte`** (new, or inline in `Providers.svelte`): Modal UI collecting the base URL, calling `Optimade.addProvider()`, and pushing the result into the custom-providers store. Uses the existing `src/layouts/Modal.svelte` wrapper and the local-`open` pattern from `src/views/Header.svelte`.
- **`src/services/optimade.ts`**: Re-exports the `Optimade.addProvider` capability (already available on the singleton); no logic change required beyond ensuring the singleton is the one used by the modal.
- **No changes to `optimade-client/`** (the library): `addProvider` already exists and is sufficient. No changes to `prefetched.json` or the prefetch script.
- **No breaking changes**: builtin provider behavior, URL param shape, and existing selection persistence are unchanged. The `custom` id is additive.