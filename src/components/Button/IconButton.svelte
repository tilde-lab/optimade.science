<Button {...$$restProps} shape="square" variant="link" on:click on:dblclick>
    <Icon {icon} size={iconSize} />
</Button>

<script lang="ts" context="module">
    import type { Zoom } from '@/components/Icon';
    export type { Size } from './Button.svelte';
    export type { Zoom } from '@/components/Icon';
</script>

<script lang="ts">
    import Button from './Button.svelte';
    import Icon from '@/components/Icon';

    export let icon: string = '';
    export let iconSize: Zoom;
</script>
