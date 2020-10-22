<div class="container grid-{size}">
    <slot />
</div>

<script lang="ts" context="module">
    import type { Size } from '@/types/size';
</script>

<script lang="ts">
    export let size: Size = 'md';
</script>

<style lang="scss">
    @import 'spectre.css/src/variables';
    @import 'spectre.css/src/mixins';
    @import 'spectre.css/src/layout';
</style>
