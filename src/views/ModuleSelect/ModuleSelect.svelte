{#await $modules then predefined}
	<Autocomplete {groupBy} {predefined} bind:selected creatable placeholder="Select app or enter app URL" empty="No apps added" />
{/await}

<script lang="ts" context="module">
	import { Autocomplete } from 'svelte-spectre';

	import modules, { builtinModulesSync } from '@/stores/modules';

	import { moduleGroups } from '@/config';
</script>

<script lang="ts">
	let selected: any[] = [];

	export let selectedValue: string;

	$: selectedValue = selected[0]?.value;

	$: if (selectedValue) {
		modules.update(async ($modules) => {
			if (!(await $modules).includes(selectedValue)) {
				(await $modules).unshift(selectedValue);
			}
			return $modules;
		});
	}

	const groupBy = (item: { value: string }): string => ($builtinModulesSync.includes(item.value) ? moduleGroups.builtin : moduleGroups.local);
</script>
