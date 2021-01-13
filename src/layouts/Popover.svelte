<div class="popover popover-{pos}">
    <slot name="trigger" />
    <div class="popover-container">
        <slot />
    </div>
</div>

<script lang="ts" context="module">
    export type Position = 'top' | 'bottom' | 'left' | 'right';
</script>

<script lang="ts">
    export let pos: Position = 'top';
</script>

<style lang="scss">
    @import 'spectre.css/src/popovers';
</style>
