<ul class="step">
    {#each steps as { href, label }}
    <li class="step-item">
        <a {href} class="tooltip" data-tooltip={label}>{label}</a>
    </li>
    {/each}
</ul>

<script lang="ts">
    export let steps: [] = [];
</script>

<style lang="scss">
    @import 'spectre.css/src/variables';
    @import 'spectre.css/src/mixins';
    @import 'spectre.css/src/steps';
</style>