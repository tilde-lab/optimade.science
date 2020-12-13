<Button {...$$restProps} shape="square" variant="link" on:click on:dblclick>
    <Icon {icon} size={iconSize} />
</Button>

<script lang="ts" context="module">
    import Button from './Button.svelte';
    import Icon from '@/components/Icon';

    import type { Zoom } from '@/components/Icon';
    export type { Size } from './Button.svelte';
    export type { Zoom } from '@/components/Icon';
</script>

<script lang="ts">
    export let icon: string = '';
    export let iconSize: Zoom;
</script>
