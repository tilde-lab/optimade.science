{#await $modules then options}
	<Select {options} bind:value={selectedValue} placeholder="Select app or enter app URL" style="margin: 0 0 1em" />
{/await}

<script lang="ts" context="module">
	import { Select } from 'svelte-spectre';
	import modules from '@/stores/modules';
</script>

<script lang="ts">
	export let selectedValue: string;
</script>
