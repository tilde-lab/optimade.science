<Input
    bind:value={$query.params.filter}
    placeholder="start typing..."
    name="filter"
    type="search"
    size="lg"
    inline
    autofocus
>
    <span class="label">filter=</span>
    <span slot="iconRight">
        {#await $searchAll}
            <Icon icon="loading" />
        {:then _}
            {#if $query.params.filter}
                <IconButton
                    size="sm"
                    icon="icon-cross"
                    style="display: flex;"
                    on:click={() => ($query.params.filter = '')}
                />
            {:else}
                <Icon icon="icon-search" />
            {/if}
        {/await}
    </span>
</Input>

{#if !$query.params.filter}
    <div class="examples">
        <i>e.g.</i><Button variant="link" on:click={() => $query.params.filter = example}>{example}</Button>
    </div>
{/if}

<script lang="ts" context="module">
    import { onMount } from 'svelte';
    import { query } from 'svelte-pathfinder';

    import Input from '@/components/Input';
    import Button, { IconButton } from '@/components/Button';
    import Icon from '@/components/Icon';

    import { searchAll } from '@/stores/search';

    const examples = [
        'nelements=1',
        'elements HAS "Ti"',
        'elements HAS ALL "C","N","O","H"',
        //'spacegroup="I4/mcm"',
        'elements HAS "Ti" AND nelements>3',
        'chemical_formula_reduced="Li7Sn2"',
        'chemical_formula_anonymous="ABC"'
    ];
</script>

<script lang="ts">
    let example = examples[0];
    onMount(() => {
        const interval: number = setInterval(() => {
            example = examples[Math.floor(Math.random() * examples.length)];
        }, 2000);
        return () => clearInterval(interval);
    });
</script>

<style>
    .label { float: right; font-family: Courier; letter-spacing: 0.5px; }
    .examples { padding-left: 9em; font-family: Courier; letter-spacing: 0.5px; }
    /* NB to align div.examples > i & div.examples > button by height */
</style>
