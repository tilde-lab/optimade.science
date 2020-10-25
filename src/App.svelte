<svelte:window on:click={click} />

<Container size="md">
    <Header />
    <Section>
        <Search />
    </Section>
    <Section>
        <Providers />
    </Section>
    <main>
        <Results />
    </main>
</Container>

<script lang="ts">
    import { click } from 'svelte-pathfinder';

    import Container from '@/layouts/Container.svelte';
    import Section from '@/layouts/Section.svelte';

    import Header from '@/views/Header.svelte';
    import Search from '@/views/Search.svelte';
    import Results from '@/views/Results.svelte';
    import Providers from '@/views/Providers.svelte';
</script>

<style lang="scss" global>
    @import 'spectre.css/src/variables';
    @import 'spectre.css/src/mixins';
    @import 'spectre.css/src/normalize';
    @import 'spectre.css/src/base';
    @import 'spectre.css/src/typography';
    @import 'spectre.css/src/animations';
    @import 'spectre.css/src/utilities';
</style>
