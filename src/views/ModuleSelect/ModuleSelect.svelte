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
    let selected = [];

    export let selectedValue: string;

    $: if (selected.length) {
        selectedValue = selected[0].value;
        modules.update(($modules: string[]) => {
            if (!$modules.includes(selectedValue)) {
                $modules.unshift(selectedValue);
            }
            return $modules;
        });
    }

    const groupBy = (item) =>
        $builtinModulesSync.includes(item?.value)
            ? moduleGroups.builtin
            : moduleGroups.local;
</script>
