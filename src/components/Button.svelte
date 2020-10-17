{#if href}
    <a
        {...$$restProps}
        {href}
        class="btn btn-{variant} btn-{size}"
        class:btn-block={block}
        class:btn-action={!!shape}
        class:s-circle={shape === 'circle'}
        class:loading
        class:active
        on:click
        on:dblclick
    >
        <slot>Text</slot>
    </a>
{:else}
    <button
        {...$$restProps}
        class="btn btn-{variant} btn-{size}"
        class:btn-block={block}
        class:btn-action={!!shape}
        class:s-circle={shape === 'circle'}
        class:loading
        class:active
        on:click
        on:dblclick
    >
        <slot>Text</slot>
    </button>
{/if}

<script lang="ts" context="module">
    export type Variant =
        | 'default'
        | 'primary'
        | 'link'
        | 'success'
        | 'error';
    export type Size = 'nm' | 'lg' | 'sm';
    export type Shape = 'square' | 'circle';
</script>

<script lang="ts">
    export let variant: Variant = 'default';
    export let size: Size = 'nm';
    export let shape: Shape;
    export let active: boolean = false;
    export let loading: boolean = false;
    export let block: boolean = false;
    export let href: string;
</script>

<style lang="scss">
    @import "spectre.css/src/variables";
    @import "spectre.css/src/mixins";
    @import 'spectre.css/src/buttons';
</style>
