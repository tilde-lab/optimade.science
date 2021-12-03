<div bind:clientWidth={width}>
    {#if total > 10}
        <nav class="p-sticky" style="top: 0; z-index: 100; background: white;">
            <Section>
                <Pagination
                    {total}
                    bind:limit={$query.params.limit}
                    bind:page={$query.params.page}
                    rest={7}
                />
            </Section>
        </nav>
    {/if}
    {#each $results as result, index}
        {#await result}
            <Section heading="Searching...">
                <Loader.Cards
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    height={210}
                    rows={2}
                    w={125}
                    h={100}
                    {width}
                    {cols}
                />
            </Section>
        {:then [apis, provider]}
            <Section heading={provider.attributes.name}>
                {#if !apis || apis.some((a) => a instanceof Error || !a.data.length)}
                    <div class="text-mute text-tiny text-center">
                        {apis[0] instanceof Error ? apis : 'No results'}
                    </div>
                {:else}
                    <Grid
                        items={apis[0].data}
                        {cols}
                        let:rowIndex
                        let:colIndex
                        let:item
                    >
                        {#if item}
                            <Modal
                                open={$fragment ===
                                    `#${provider.id}-${item.id}`}
                                on:toggle={clearFragmentOnClose}
                            >
                                <a
                                    id="{provider.id}-{item.id}"
                                    href="#{provider.id}-{item.id}"
                                    on:click|preventDefault={() =>
                                        ($fragment = `#${provider.id}-${item.id}`)}
                                    in:fade={{
                                        delay: delay(
                                            index,
                                            rowIndex,
                                            colIndex,
                                            25
                                        ),
                                    }}
                                >
                                    <Card
                                        style="min-height: 130px; text-align: center;"
                                    >
                                        <span
                                            slot="title"
                                            class:text-xtiny={getTitle(item)
                                                .length >= 150}
                                        >
                                            {@html getTitle(item)}
                                        </span>
                                    </Card>
                                </a>
                                <div slot="content">
                                    <IconButton
                                        icon="icon-cross"
                                        style="float: right; margin-top: -0.8rem;"
                                        on:click={() => ($fragment = '')}
                                    />
                                    <Result data={item} />
                                </div>
                            </Modal>
                        {/if}
                    </Grid>
                {/if}
            </Section>
        {/await}
    {/each}
</div>

<script lang="ts" context="module">
    import { fade } from 'svelte/transition';
    import { query, fragment } from 'svelte-pathfinder';
    import { Accordion, Pagination } from 'svelte-spectre';

    import Section from '@/layouts/Section.svelte';
    import Grid from '@/layouts/Grid.svelte';
    import Card from '@/layouts/Card.svelte';
    import Modal from '@/layouts/Modal.svelte';

    import { IconButton } from '@/components/Button';
    import * as Loader from '@/components/loaders';

    import Result from '@/views/Result.svelte';

    import results, { searchAll } from '@/stores/search';

    import type { Cols } from '@/layouts/Grid.svelte';
    import type { Types } from '@/services/optimade';
</script>

<script lang="ts">
    export let cols: Cols = 6;

    let total = 0;
    // limits = [10];

    $query.params.page = 1;
    $query.params.limit = 10;

    $: (async () => {
        // const fetchedProviders = await Promise.all($results);
        const fetchedProviders = await $searchAll;
        const filteredProviders = fetchedProviders.filter(
            ([apis, provider]) =>
                apis &&
                apis.some((a) => !(a instanceof Error) && a?.data.length)
        );
        const returnedTotals = filteredProviders.reduce(
            (acc, [apis, provider]) => {
                acc = acc.length
                    ? [...acc, apis[0].meta.data_returned]
                    : [apis[0].meta.data_returned];
                return acc;
            },
            []
        );
        // const returnedLimits = filteredProviders.reduce(
        //     (acc, [apis, provider]) => {
        //         acc = acc.length
        //             ? [...acc, ...apis[0].meta.limits]
        //             : [...apis[0].meta.limits];
        //         return [...new Set(acc)];
        //     },
        //     []
        // );
        total = returnedTotals.length && Math.max(...returnedTotals) / 100;
        // limits = returnedLimits;

        console.log(
            filteredProviders,
            returnedTotals,
            returnedTotals.length && Math.max(...returnedTotals),
            returnedLimits
        );
    })();

    // function setPage(page: Param) {
    //     console.log(page === 0);
    //     page = page === 0 ? 1 : page;
    // }
    // $: setPage($query.params.page);

    let width: number;

    function delay(i: number, j: number, k: number, m: number = 100) {
        return i * m * 10 + j * cols * m + k * m;
    }

    function clearFragmentOnClose({ detail: open }) {
        !open && ($fragment = '');
    }

    function getTitle(item: Types.Structure) {
        return addSubTags(
            item.attributes.chemical_formula_hill ||
                item.attributes._tcod_unreduced_formula ||
                item.attributes.chemical_formula_reduced ||
                item.id
        );
    }

    function addSubTags(string: string) {
        let sub = false,
            html = '';
        for (let i = 0, len = string.length; i < len; i++) {
            if (!isNaN(+string[i]) || string[i] == '.') {
                if (!sub) {
                    html += '<sub>';
                    sub = true;
                }
            } else {
                if (sub) {
                    html += '</sub>';
                    sub = false;
                }
            }
            html += string[i];
        }
        if (sub) html += '</sub>';
        return html;
    }
</script>

<style>
    a {
        display: block;
        color: initial;
        transition: all 0.2s ease-in-out;
    }
    a:hover,
    a:active,
    a:focus,
    a:visited {
        color: initial;
        text-decoration: none;
    }
    a:hover {
        transform: scale(1.1);
    }
    .text-xtiny {
        font-size: 0.7em;
    }
    :global(.pagination) {
        justify-content: center;
    }
</style>
