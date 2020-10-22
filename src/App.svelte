<svelte:window on:click={click} />

<Main.Container width="800px">
    <Header />
    <Main.Section>
        <Search />
    </Main.Section>
    <Main.Section heading="Providers">
        <Providers />
    </Main.Section>
</Main.Container>

<script lang="ts">
    import { click } from 'svelte-pathfinder';

    import * as Main from '@/layouts/Main';

    import Header from '@/views/Header.svelte';
    import Search from '@/views/Search.svelte';
    import Providers from '@/views/Providers/Providers.svelte';
</script>

<style lang="scss" global>
    @import 'spectre.css/src/variables';
    @import 'spectre.css/src/mixins';
    @import 'spectre.css/src/normalize';
    @import 'spectre.css/src/base';
    @import 'spectre.css/src/typography';
    @import 'spectre.css/src/layout';
    @import 'spectre.css/src/animations';
    @import 'spectre.css/src/utilities';
</style>
