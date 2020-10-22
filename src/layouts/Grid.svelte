{#each rows as row, rowIndex (row)}
    <div
        {...$$restProps}
        class:col-gapless={gapless}
        class:col-oneline={oneline}
        class="columns"
    >
        {#each row as item, colIndex (item)}
            <div class="column col-{col} my-1">
                <slot {item} {rowIndex} {colIndex} />
            </div>
        {/each}
    </div>
{/each}

<script lang="ts" context="module">
    export type Cols = 12 | 6 | 4 | 2 | 1;
</script>

<script lang="ts">
    export let items: [] = [];
    export let cols: Cols = 12;
    export let gapless: boolean = false;
    export let oneline: boolean = false;

    let col: number;
    let rows: [];

    $: col = 12 / cols;
    $: rows = [].concat.apply(
        [],
        items.map((_, i, items) => (i % cols ? [] : [items.slice(i, i + cols)]))
    );
</script>

<style lang="scss" global>
    @import 'spectre.css/src/variables';
    @import 'spectre.css/src/mixins';
    @import 'spectre.css/src/layout';
</style>
