<div bind:clientWidth={width}>
    {#await $results}
        <Section heading="Searching...">
            <Loader.Cards
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                rows={2}
                cols={6}
                w={125}
                h={100}
                height={210}
                {width}
            />
        </Section>
    {:then results}
        {#each results as [provider, results]}
            <Section heading={provider.attributes.name}>
                <Grid items={[...Array(10).keys()]} cols={6} let:colIndex>
                    <Card>
                        <span slot="title" class="h6">CI<sub
                            >{colIndex}</sub></span>
                        <span slot="subtitle" class="text-small text-gray">
                            {results}
                        </span>
                    </Card>
                </Grid>
            </Section>
        {/each}
    {/await}
</div>

<script lang="ts">
    import Section from '@/layouts/Section.svelte';
    import Grid from '@/layouts/Grid.svelte';

    import Card from '@/components/Card';
    import * as Loader from '@/components/loaders';

    import results from '@/stores/search';

    let width;
</script>
