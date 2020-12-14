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

<script lang="ts" context="module">
    import Tile from '@/layouts/Tile.svelte';
    import { IconButton } from '@/components/Button';

    import modules, { builtinModulesSync } from '@/stores/modules';

    export interface Item {
        label: string;
        value: string;
        isCreator?: boolean;
    }
</script>

<script lang="ts">
    export let item: Item;
    export let filterText: string;

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
