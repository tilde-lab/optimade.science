<ContentLoader {width} {...$$restProps}>
    {#each { length: count } as _, i}
        <circle cx={radius + i * offset} cy={radius} r={radius} />
    {/each}
</ContentLoader>

<script lang="ts">
    import ContentLoader from 'svelte-content-loader';

    export let width: number = 100;
    export let count: number = 10;
    export let radius: number = 16;

    let diameter: number;
    let offset: number;

    $: diameter = radius * 2;
    $: offset = diameter + (width - count * diameter) / count + count * 0.1;
</script>
