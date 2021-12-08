{#await $modules then items}
    <Select
        bind:selectedValue={selected}
        {items}
        {groupBy}
        {Item}
        isCreatable={true}
        placeholder="Select module or enter module URL"
        noOptionsMessage="No modules added"
    />
{/await}

<script lang="ts" context="module">
    import Select from '@/components/Select';
    import Item from './components/Item.svelte';

    import modules, { builtinModulesSync } from '@/stores/modules';

    import { moduleGroups } from '@/config';
</script>

<script lang="ts">
    export let selected = null;

    $: if (selected) {
        modules.update(($modules: string[]) => {
            if (!$modules.includes(selected.value)) {
                $modules.unshift(selected.value);
            }
            return $modules;
        });
    }

    $: groupBy = (item) =>
        $builtinModulesSync.includes(item.value)
            ? moduleGroups.builtin
            : moduleGroups.local;
</script>
