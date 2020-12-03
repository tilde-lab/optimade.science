{#await $modules then items}
    <Select
        bind:selectedValue={selected}
        {items}
        {groupBy}
        {Item}
        isCreatable={true}
        placeholder="Select exisitng module or enter an URL"
        noOptionsMessage="No modules added"
    />
{/await}

<script lang="ts">
    import Select from '@/components/Select';
    import Item from './components/Item.svelte';

    import modules, { builtinModulesSync } from '@/stores/modules';

    import { moduleGroups } from '@/config';

    export let selected = null;

    $: if (selected) {
        modules.update(($modules) => {
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
