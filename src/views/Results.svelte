<div bind:clientWidth={width}>
    {#each $results as result, index}
        {#await result}
            <Section heading="Searching...">
                <Loader.Cards
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    height={290}
                    rows={2}
                    w={125}
                    h={130}
                    {width}
                    {cols}
                />
            </Section>
        {:then [apis, provider]}
            <Section heading={provider.attributes.name}>
                {#if !apis || apis.some((a) => a instanceof Error || !a.data.length)}
                    <div class="text-mute text-center">
                        {apis[0] instanceof Error ? apis : 'No results'}
                    </div>
                {:else}
                    <Grid stack>
                        {#each apis[0].data as item, i}
                            <Col col="2" md="3" sm="4" xs="6">
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
                                            delay: delay(index, i, 25),
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
                                        <Result data={item} />
                                    </div>
                                </Modal>
                            </Col>
                        {/each}
                    </Grid>
                {/if}
            </Section>
        {/await}
    {/each}
</div>

<svelte:window bind:innerWidth={windowWidth} />

<script lang="ts" context="module">
    import { fade } from 'svelte/transition';
    import { fragment } from 'svelte-pathfinder';
    import { Card, Col, Grid } from 'svelte-spectre';

    import Section from '@/layouts/Section.svelte';
    import Modal from '@/layouts/Modal.svelte';

    import * as Loader from '@/components/loaders';

    import Result from '@/views/Result.svelte';

    import results from '@/stores/search';

    import type { Types } from '@/services/optimade';
</script>

<script lang="ts">
    let cols: number = 6,
        windowWidth = 0,
        width: number;

    function delay(index: number, i: number, m: number = 100) {
        switch (true) {
            case windowWidth <= 480:
                cols = 2;
                break;
            case windowWidth <= 600:
                cols = 3;
                break;
            case windowWidth <= 840:
                cols = 4;
                break;
            default:
                cols = 6;
                break;
        }
        return (
            index * m * 10 +
            Math.trunc(i / cols) * cols * m +
            Math.trunc(i % cols) * m
        );
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
        transition: all 0.5s ease-in-out;
    }
    a:hover,
    a:active,
    a:focus,
    a:visited {
        text-decoration: none !important;
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
