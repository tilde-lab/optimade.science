{#await $modules then items}
    <Autocomplete
        {groupBy}
        bind:selected
        creatable={true}
        predefined={items}
        placeholder="Select module or enter module URL"
        empty="No modules added"
    />
{/await}

<script lang="ts" context="module">
    import { Autocomplete } from 'svelte-spectre';

    import modules, { builtinModulesSync } from '@/stores/modules';

    import { moduleGroups } from '@/config';
</script>

<script lang="ts">
    let selected: any[] = [];

    export let selectedValue: string;

    $: if (selected.length) {
        selectedValue = selected[0].value;
        modules.update(async ($modules: Promise<string[]>) => {
            if (!(await $modules).includes(selectedValue)) {
                (await $modules).unshift(selectedValue);
            }
            return $modules;
        });
    }

    const groupBy = (item: { value: string }): string =>
        $builtinModulesSync.includes(item.value)
            ? moduleGroups.builtin
            : moduleGroups.local;
</script>
