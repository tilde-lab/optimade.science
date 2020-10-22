<i class="icon icon-{size} {icon}" {...$$restProps} />

<script lang="ts" context="module">
    export type Size = '1x' | '2x' | '3x' | '4x';
</script>

<script lang="ts">
    export let icon: string = '';
    export let size: Size = '1x';
</script>

<style lang="scss">
    @import 'spectre.css/src/variables';
    @import 'spectre.css/src/mixins';
    @import 'spectre.css/src/icons/icons-core';
    @import 'spectre.css/src/icons/icons-navigation';
    @import 'spectre.css/src/icons/icons-action';
    @import 'spectre.css/src/icons/icons-object';
</style>
