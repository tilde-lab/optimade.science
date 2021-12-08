<Form>
    <FormGroup>
        <Input
            bind:value={$query.params.filter}
            placeholder="start typing filter..."
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
                {:then _}
                    {#if $query.params.filter}
                        <IconButton
                            size="sm"
                            icon="cross"
                            style="display: flex;"
                            on:click={() => ($query.params.filter = '')}
                        />
                    {:else}
                        <Icon icon="search" />
                    {/if}
                {/await}
            </svelte:fragment>
        </Input>
    </FormGroup>
</Form>

{#if !$query.params.filter}
    <div class="examples text-center">
        <Badge color="light">
            <i>e.g.</i><Button
                size="sm"
                variant="link"
                on:click={() => ($query.params.filter = example)}
                >{example}</Button
            >
        </Badge>
    </div>
{/if}

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

    const examples = [
        'nelements=1',
        'elements HAS "Ti"',
        'elements HAS ALL "C","N","O","H"',
        //'spacegroup="I4/mcm"',
        'elements HAS "Ti" AND nelements>3',
        'chemical_formula_reduced="Li7Sn2"',
        'chemical_formula_anonymous="ABC"',
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

<style lang="scss">
    .examples {
        margin-top: -0.4rem;
        i {
            vertical-align: middle;
        }
    }
</style>
