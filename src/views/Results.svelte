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
        {#each results as [provider, results], index}
            <Section heading={provider.attributes.name}>
                <Grid
                    items={[...Array(10).keys()]}
                    {cols}
                    let:rowIndex
                    let:colIndex
                >
                    <Modal
                        open={$fragment === `#${provider.id}-${rowIndex}-${colIndex}`}
                        height="80vh"
                        on:toggle={scrollTo}
                    >
                        <a
                            id="{provider.id}-{rowIndex}-{colIndex}"
                            href="#{provider.id}-{rowIndex}-{colIndex}"
                            on:click|preventDefault={() => ($fragment = `#${provider.id}-${rowIndex}-${colIndex}`)}
                            in:fade={{ delay: delay(index, rowIndex, colIndex, 25) }}
                        >
                            <Card>
                                <span slot="title" class="h6">CI<sub
                                    >{colIndex}</sub></span>
                                <span
                                    slot="subtitle"
                                    class="text-small text-gray"
                                >
                                    {results}
                                </span>
                            </Card>
                        </a>
                        <div slot="content">
                            <Result result={{ result: results }} />
                        </div>
                    </Modal>
                </Grid>
            </Section>
        {/each}
    {/await}
</div>

<script lang="ts">
    import { tick } from 'svelte';
    import { fade } from 'svelte/transition';

    import Section from '@/layouts/Section.svelte';
    import Grid from '@/layouts/Grid.svelte';
    import Card from '@/layouts/Card.svelte';
    import Modal from '@/layouts/Modal.svelte';

    import * as Loader from '@/components/loaders';
    import Result from '@/views/Result.svelte';

    import { fragment } from 'svelte-pathfinder';

    import results from '@/stores/search';

    export let cols: number = 6;

    let width;

    function delay(i, j, k, m = 100) {
        return i * m * 10 + j * cols * m + k * m;
    }

    async function scrollTo(e) {
        if (e.detail) return;
        await tick();
        setTimeout(() => {
            const anchor = document.getElementById($fragment.replace('#', ''));
            anchor &&
                anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
            $fragment = '';
        });
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
</style>
