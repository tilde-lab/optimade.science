<svelte:window on:click={click} />

<Container size="md">
    <Header />
    {#if $ready && !$query.filter}
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
    <main>
        <Results />
    </main>
</Container>

<footer>
    This
    <a
        href="https://github.com/tilde-lab/optimade.science"
        target="_blank"
    >open-source</a>
    app is possible thanks to the
    <a href="http://www.optimade.org" target="_blank">OPTIMADE</a>
    standard &mdash; Open Databases Integration for Materials Design.
</footer>

<script lang="ts" context="module">
    import { click, prefs, query } from 'svelte-pathfinder';

    import Container from '@/layouts/Container.svelte';
    import Section from '@/layouts/Section.svelte';

    import Header from '@/views/Header.svelte';
    import Search from '@/views/Search.svelte';
    import Results from '@/views/Results.svelte';
    import Providers from '@/views/Providers.svelte';

    import Logo from '@/components/Logo.svelte';

    import { ready } from '@/stores/providers';

    prefs.query.array.format = 'separator';
</script>

<style lang="scss">
    :global {
        @import 'spectre.css/src/normalize';
        @import 'spectre.css/src/base';
        @import 'spectre.css/src/typography';
        @import 'spectre.css/src/layout';
        @import 'spectre.css/src/toasts';
        @import 'spectre.css/src/animations';
        @import 'spectre.css/src/utilities';
    }

    footer {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        height: 32px;
        line-height: 32px;
        text-align: center;
        font-size: 0.85em;
        color: #333;
        background: #f6f6f6;
        border-top: 1px solid #999;
    }
    footer a {
        text-decoration: none;
        color: #333;
        border-bottom: 1px solid #333;
    }
</style>
