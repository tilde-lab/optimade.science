{#if item}
    <div class="item">
        <Tile>
            <span slot="title">{label}</span>
            <span slot="action">
                {#if removable}
                    <IconButton
                        size="sm"
                        icon="icon-delete"
                        on:click={removeItem}
                    />
                {/if}
            </span>
        </Tile>
    </div>
{/if}

<script>
    import Tile from '@/layouts/Tile.svelte';
    import { IconButton } from '@/components/Button';

    import modules, { builtinModulesSync } from '@/stores/modules';

    export let item;
    export let filterText;

    $: label = item.isCreator ? `Add \"${filterText}\"` : item.label;

    $: removable = !item.isCreator && !$builtinModulesSync.includes(item.value);

    function removeItem() {
        modules.update(($modules) => $modules.filter((m) => m !== item.value));
    }
</script>

<style>
    .item {
        padding: 0 10px;
    }
</style>
