<svelte:window on:click={click} />

<Spectre>
    <Container>
        <Header />
        {#if $providersSync.length && !$query.params.filter}
            <div class="my-2">
                <Logo size="4x" />
            </div>
        {/if}
        <Section>
            <Search />
        </Section>
        <Section>
            <Providers />
        </Section>
        <Paginator />
        <main>
            <Results />
        </main>
    </Container>
</Spectre>

<footer>
    This
    <a href="https://github.com/tilde-lab/optimade.science" target="_blank"
        >open-source</a
    >
    app is possible thanks to the
    <a href="http://www.optimade.org" target="_blank">OPTIMADE</a>
    standard &mdash; Open Databases Integration for Materials Design.
</footer>

<script lang="ts" context="module">
    import { click, prefs, query } from 'svelte-pathfinder';

    import { Container, Spectre } from 'svelte-spectre';

    import Section from '@/layouts/Section.svelte';

    import Header from '@/views/Header.svelte';
    import Search from '@/views/Search.svelte';
    import Results from '@/views/Results.svelte';
    import Paginator from '@/views/Paginator.svelte';
    import Providers from '@/views/Providers.svelte';

    import Logo from '@/components/Logo.svelte';

    import { providersSync } from '@/stores/providers';

    prefs.array.format = 'separator';
</script>

<style lang="scss">
    footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 999;
        width: 100%;
        text-align: center;
        font-size: 0.75rem;
        color: #3b4351;
        background: #f1f3f5;
        padding: 0.75rem;
    }
    footer a {
        text-decoration: none;
        color: #3b4351;
    }
</style>
