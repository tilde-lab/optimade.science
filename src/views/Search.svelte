<Form>
    <FormGroup>
        <Input
            bind:value={search}
            placeholder="filter="
            name="filter"
            type="search"
            width="12"
            size="lg"
            inline
            autofocus
        >
            <svelte:fragment slot="iconRight">
                {#await $searchAll}
                    <IconButton loading />
                {:then}
                    {#if $query.params.filter}
                        <IconButton
                            size="sm"
                            icon="cross"
                            style="display: flex;"
                            type="button"
                            on:click={clearSearch}
                        />
                    {:else}
                        <Icon icon="search" />
                    {/if}
                {/await}
            </svelte:fragment>
        </Input>
    </FormGroup>
    {#if search}
        <Badge>
            filter={$query.params.filter}
        </Badge>
    {:else}
        <Button size="md" variant="link" on:click={() => (search = example)}>
            <i class="text-gray">e.g.</i>&nbsp {example}</Button
        >
    {/if}
</Form>

<script lang="ts" context="module">
    import { onMount } from 'svelte';
    import { query } from 'svelte-pathfinder';
    import {
        Badge,
        Button,
        Icon,
        IconButton,
        Input,
        Form,
        FormGroup,
    } from 'svelte-spectre';

    import { searchAll } from '@/stores/search';

    import { guess } from '@/services/optimade';

    const examples = [
        'nelements=1',
        'elements HAS "Ti"',
        'elements HAS ALL "C","N","O","H"',
        // 'spacegroup="I4/mcm"',
        'elements HAS "Ti" AND nelements>3',
        'chemical_formula_reduced="Li7Sn2"',
        'chemical_formula_anonymous="ABC"',
    ];
</script>

<script lang="ts">
    let example = examples[0],
        search = $query.params.filter;

    onMount(() => {
        const interval: number = setInterval(() => {
            example = examples[Math.floor(Math.random() * examples.length)];
        }, 2000);
        return () => clearInterval(interval);
    });

    function clearSearch() {
        $query.params.filter = search = '';
    }

    $: $query.params.filter = guess(search) || search;
</script>
