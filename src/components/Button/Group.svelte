<div class:btn-group-block={block} class="btn-group">
    <slot />
</div>

<script lang="ts">
    export let block: boolean = false;
</script>

<style lang="scss">
    @import 'spectre.css/src/variables';
    @import 'spectre.css/src/mixins';
    @import 'spectre.css/src/buttons';
</style>
