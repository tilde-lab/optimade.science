<div class="form-group">
    <label class="form-switch">
        <input bind:checked={value} type="checkbox" />
        <i class="form-icon" />
        {#if label}{label}{/if}
    </label>
</div>

<script lang="ts">
    export let label: string = '';
    export let value: boolean = false;
</script>

<style lang="scss">
    @import 'spectre.css/src/variables';
    @import 'spectre.css/src/mixins';
    @import 'spectre.css/src/forms';
</style>
