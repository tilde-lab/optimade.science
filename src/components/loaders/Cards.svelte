<ContentLoader {width} {height} {...$$restProps}>
    {#each { length: rows } as _, i}
        {#each { length: cols } as _, j}
            <rect
                x={j * (w + x)}
                y={i * (h + y)}
                rx="8"
                ry="8"
                width={w}
                height={h}
            />
        {/each}
    {/each}
</ContentLoader>

<script lang="ts">
    import ContentLoader from 'svelte-content-loader';

    export let width: number = 100;
    export let height: number = 100;
    export let rows: number = 1;
    export let cols: number = 12;
    export let w: number = 220;
    export let h: number = 220;

    let x: number;
    let y: number;

    $: x = (width - cols * w) / cols + cols / 2;
    $: y = (height - rows * h) / rows + rows / 2;
</script>
