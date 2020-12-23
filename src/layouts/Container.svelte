<div class="container grid-{size}">
    <slot />
</div>

<script lang="ts" context="module">
    import type { Size } from '@/types/size';
    export type { Size };
</script>

<script lang="ts">
    export let size: Size = 'md';
</script>
