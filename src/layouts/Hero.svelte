<div class="hero bg-{bg} hero-{size}">
    <div class="hero-body">
        <slot />
    </div>
</div>

<script lang="ts" context="module">
    import type { Color } from '@/types/bg';
    import type { Size } from '@/types/size';
    export { Size, Color };
</script>

<script lang="ts">
    export let size: Size = 'md';
    export let bg: Color = 'gray';
</script>

<style lang="scss">
    @import 'spectre.css/src/variables';
    @import 'spectre.css/src/mixins';
    @import 'spectre.css/src/hero';
</style>
