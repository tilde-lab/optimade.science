<div bind:clientWidth={width}>
    {#await $results}
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
    {:then results}
        {#each results as [structures, provider], index}
            <Section heading={provider.attributes.name}>
                {#if structures && structures.length}
                    <Grid
                        items={structures}
                        {cols}
                        let:rowIndex
                        let:colIndex
                        let:item
                    >
                        <Modal
                            open={$fragment === `#${provider.id}-${item.id}`}
                            on:toggle={clearFragmentOnClose}
                        >
                            <a
                                id="{provider.id}-{item.id}"
                                href="#{provider.id}-{item.id}"
                                on:click|preventDefault={() => ($fragment = `#${provider.id}-${item.id}`)}
                                in:fade={{ delay: delay(index, rowIndex, colIndex, 25) }}
                            >
                                <Card style="min-height: 130px; text-align: center; font-family:Courier; letter-spacing:-1px;">
                                    <span
                                        slot="title"
                                        class:text-xtiny={getTitle(item).length >= 150}
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
                    </Grid>
                {:else}
                    <div class="text-mute text-tiny text-center">
                        No results
                    </div>
                {/if}
            </Section>
        {/each}
    {/await}
</div>

<script lang="ts">
    import { fade } from 'svelte/transition';
    import { fragment } from 'svelte-pathfinder';

    import Section from '@/layouts/Section.svelte';
    import Grid from '@/layouts/Grid.svelte';
    import Card from '@/layouts/Card.svelte';
    import Modal from '@/layouts/Modal.svelte';

    import { IconButton } from '@/components/Button';
    import * as Loader from '@/components/loaders';

    import Result from '@/views/Result.svelte';

    import results from '@/stores/search';

    export let cols: number = 6;

    let width;

    function delay(i, j, k, m = 100) {
        return i * m * 10 + j * cols * m + k * m;
    }

    function clearFragmentOnClose({ detail: open }) {
        !open && ($fragment = '');
    }

    function getTitle(item) {
        return addSubTags(
            item.attributes.chemical_formula_hill ||
                item.attributes._tcod_unreduced_formula ||
                item.attributes.chemical_formula_reduced ||
                item.id
        );
    }

    function addSubTags(string) {
        let sub = false,
            html = '';
        for (let i = 0, len = string.length; i < len; i++) {
            if (!isNaN(string[i]) || string[i] == '.') {
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
</style>
