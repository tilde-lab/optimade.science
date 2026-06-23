## ADDED Requirements

### Requirement: "use new" affordance in the provider grid

The provider grid in `src/views/Providers.svelte` SHALL render an additional "use new" avatar tile, visually consistent with the existing provider tiles, that is not part of the providers data array. Clicking it SHALL open the "Add custom provider" modal.

#### Scenario: "use new" tile is rendered alongside builtin providers
- **WHEN** the provider grid is rendered
- **THEN** a trailing "use new" tile SHALL appear after all builtin provider tiles
- **AND** its avatar label SHALL be `use new`

#### Scenario: Clicking "use new" opens the modal
- **WHEN** the user clicks the "use new" tile
- **THEN** the "Add custom provider" modal SHALL open
- **AND** no provider selection SHALL change as a side-effect of opening the modal

### Requirement: Add custom provider modal collects only a base URL

The "Add custom provider" modal SHALL request exactly one required input from the user: the OPTIMADE base URL of the provider. No other field SHALL be required. The provider id and `attributes.name` SHALL be fixed to `custom`.

#### Scenario: Modal presents a single URL input
- **WHEN** the modal is open
- **THEN** a single text input for the base URL SHALL be visible
- **AND** no name, description, homepage, or id field SHALL be presented as required

#### Scenario: Submission with empty URL is rejected
- **WHEN** the user submits the modal with an empty base URL
- **THEN** submission SHALL be prevented
- **AND** an inline validation message SHALL indicate the URL is required

### Requirement: Custom provider is registered via Optimade.addProvider

On submission, the app SHALL construct a `Types.Provider` object with `id: "custom"`, `type: "links"`, and `attributes.base_url` set to the user-supplied URL (other `attributes` fields defaulted/empty), and SHALL register it by calling `Optimade.addProvider()` on the shared `optimade` singleton so that `/info` is probed and `api_version`, `query_limits`, and the `apis` entry are auto-filled.

#### Scenario: Successful registration
- **WHEN** the user submits a valid, reachable base URL
- **THEN** `Optimade.addProvider()` SHALL be invoked with a provider whose `id` is `custom`
- **AND** the returned/enriched provider SHALL be stored under `optimade.providers["custom"]`
- **AND** `optimade.apis["custom"]` SHALL be populated

#### Scenario: Registration failure is surfaced
- **WHEN** `Optimade.addProvider()` throws (network error, CORS, non-OPTIMADE response, or invalid URL)
- **THEN** the modal SHALL remain open
- **AND** an error message SHALL be displayed to the user
- **AND** no custom provider definition SHALL be written to localStorage

### Requirement: Custom provider definition persists across reloads

Custom provider definitions SHALL be persisted to `localStorage` under a dedicated key (distinct from the existing `optimade-providers` selection key). On app load, the persisted definition SHALL be re-hydrated into `optimade.providers["custom"]` and `optimade.apis["custom"]` so the tile renders and is selectable without re-probing `/info`.

#### Scenario: Definition persisted after successful add
- **WHEN** a custom provider is successfully registered
- **THEN** its full enriched `Types.Provider` definition SHALL be written to localStorage under the custom-providers key
- **AND** the existing `optimade-providers` selection key SHALL remain a pure string array of selected ids

#### Scenario: Definition re-hydrated on load
- **WHEN** the app loads and a custom provider definition exists in localStorage
- **THEN** `optimade.providers["custom"]` and `optimade.apis["custom"]` SHALL be populated from the persisted definition
- **AND** the custom provider SHALL appear in the provider grid without any network request

#### Scenario: No custom provider stored
- **WHEN** the app loads and no custom provider definition exists in localStorage
- **THEN** no `custom` entry SHALL be present in the provider grid
- **AND** no error SHALL be raised

### Requirement: Custom provider appears in the merged providers store

The existing `providers` asyncable (`src/stores/providers.ts`) SHALL include the re-hydrated custom provider (when present) in its resolved array, so that `providersSync` and `Providers.svelte` render it automatically alongside builtins.

#### Scenario: Custom provider present in merged list
- **WHEN** a custom provider definition is stored
- **THEN** the `providers` asyncable SHALL resolve to an array containing the `custom` provider
- **AND** `providersSync` SHALL mirror that array

#### Scenario: Custom provider absent from merged list
- **WHEN** no custom provider definition is stored
- **THEN** the `providers` asyncable SHALL resolve to the builtin providers only
- **AND** the `custom` id SHALL NOT appear

### Requirement: Custom provider is selectable via the existing URL and selection state

Selecting the custom provider SHALL use the same mechanism as builtin providers: toggling `custom` in `$query.params.providers`. The selection SHALL persist in the existing `optimade-providers` localStorage key alongside builtin ids. The reconciliation in `retrieveProviderSelections` SHALL NOT drop the `custom` id when it is present in the URL and a custom provider definition exists.

#### Scenario: Selecting the custom provider updates the URL
- **WHEN** the user clicks the custom provider's avatar tile
- **THEN** `$query.params.providers` SHALL include `custom`
- **AND** the URL SHALL reflect `?providers=...custom...` per the configured separator array format

#### Scenario: Custom selection persists across reloads
- **WHEN** the user reloads the page with `?providers=custom` and a custom provider definition is stored
- **THEN** the `custom` provider SHALL remain selected after load
- **AND** the `optimade-providers` localStorage key SHALL contain `custom` in its id array

#### Scenario: Unknown custom id in URL without a stored definition
- **WHEN** the app loads with `?providers=custom` but no custom provider definition is stored
- **THEN** the `custom` id SHALL be treated as unresolvable (not selected, no error)
- **AND** the URL param SHALL be reconciled to drop the unresolvable id, consistent with existing behavior for unknown builtin ids

### Requirement: Re-adding a custom provider overwrites the existing one

Because the custom provider id is fixed to `custom`, submitting the modal again with a new URL SHALL overwrite the previously stored custom provider definition and re-probe `/info` for the new URL.

#### Scenario: Second submission overwrites the first
- **WHEN** a custom provider is already stored and the user submits the modal with a different base URL
- **THEN** `Optimade.addProvider()` SHALL be invoked again with the new URL
- **AND** the persisted definition SHALL be replaced with the newly enriched one
- **AND** there SHALL remain at most one custom provider entry