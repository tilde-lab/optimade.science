<main class="container" style="max-width: {width}">
    <slot />
</main>

<script lang="ts">
    export let width: string = '100%';
</script>

<style lang="scss">
    .container {
        flex-flow: column wrap;
        justify-content: center;
        padding: 0;
    }
</style>
