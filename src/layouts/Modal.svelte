<MorphingModal
    {...$$restProps}
    {fullscreen}
    {width}
    {height}
    bind:open
    on:toggle
    on:adjust
>
    <slot />
    <Modal slot="content" size="fs" custom on:close={() => (open = false)}>
        <slot name="header" slot="header" />
        <slot name="content" />
    </Modal>
</MorphingModal>

<script lang="ts" context="module">
    import MorphingModal from 'svelte-morphing-modal';
    import { Modal } from 'svelte-spectre';

    export const SIZE = {
        sm: 320,
        md: 640,
        lg: 960,
    } as const;

    export type Size = keyof typeof SIZE;
</script>

<script lang="ts">
    export let open: boolean = false;
    export let size: Size = 'md';
    export let fullscreen: boolean = true;
    export let height: string = '100%';

    $: width = fullscreen ? '100%' : `${SIZE[size]}px`;
</script>
