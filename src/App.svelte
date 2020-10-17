<svelte:window on:click={click} />

<h1>Hello {name}</h1>

<script lang="ts">
    import { click } from 'svelte-pathfinder';

    let name: string = 'world';
</script>

<style lang="scss">
    :global {
        @import "spectre.css/src/variables";
        @import "spectre.css/src/mixins";
        @import "spectre.css/src/normalize";
        @import "spectre.css/src/base";
        @import "spectre.css/src/typography";
        @import "spectre.css/src/animations";
        @import "spectre.css/src/utilities";
    }
</style>
