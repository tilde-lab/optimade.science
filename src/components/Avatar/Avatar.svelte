<figure
    class="avatar text-{weight}"
    data-initial={initials}
    style="
        background-color: {color};
        font-size: 0.5rem;
        height: 3.6rem;
        width: 3.6rem;
        margin: 0.5rem;
        color: {color.isLight()
        ? '#000'
        : '#fff'}
    "
>
    <slot />
    {#if $$slots.sub}
        <span class="avatar-icon">
            <slot name="sub" />
        </span>
    {/if}
    {#if status}<i class="avatar-presence {status}" />{/if}
    {#if caption || $$slots.caption}
        <figcaption class="text-dark">
            <slot name="caption">{name}</slot>
        </figcaption>
    {/if}
</figure>

<script lang="ts" context="module">
    import tinycolor from 'tinycolor2';

    import type { Size } from '@/types/size';
    import type { Weight } from '@/types/text';
    import { SIZE } from '@/types/const';

    export type Status = 'online' | 'busy' | 'away' | 'offline' | false;
    export type { Size, Weight };
</script>

<script lang="ts">
    export let name: string = '';
    export let bg: string = '#f6f6f6';
    export let len: number = 0;
    export let caption: boolean = false;
    export let size: Size = 'md';
    export let weight: Weight = 'normal';
    export let status: Status = false;

    let words: string;
    let clip: number;
    let fontSize: number;
    let initials: string;

    function str_to_rgb(input_str) {
        var baseRed = 0,
            baseGreen = 256,
            baseBlue = 256;
        //lazy seeded random hack to get values from 0 - 256
        //for seed just take bitwise XOR of first two chars
        var seed = input_str.charCodeAt(0) ^ input_str.charCodeAt(1);
        var rand_1 = Math.abs(Math.sin(seed++) * 10000) % 256;
        var rand_2 = Math.abs(Math.sin(seed++) * 10000) % 256;
        var rand_3 = Math.abs(Math.sin(seed++) * 10000) % 256;
        var red = Math.round((rand_1 + baseRed) / 2);
        var green = Math.round((rand_2 + baseGreen) / 2);
        var blue = Math.round((rand_3 + baseBlue) / 2);
        return `rgb(${[red, green, blue].join(',')})`;
    }

    $: color = tinycolor(str_to_rgb(name));
    $: words = 'as';
    $: clip = len || 2;
    $: fontSize = SIZE[size] * (1 / clip);
    $: initials = name;
</script>

<style lang="scss">
    @import 'spectre.css/src/avatars';
    @import 'spectre.css/src/utilities';

    .avatar .avatar-icon {
        border-radius: 50%;
        padding: $unit-o $unit-h;
    }

    figure {
        width: 60px;
        height: 60px;
    }

    figcaption {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translate(-50%, 0);
        font-size: 80%;
        color: black;
        text-align: center;
    }
</style>
