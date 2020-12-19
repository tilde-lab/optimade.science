<figure
    class="avatar avatar-{size} text-{weight}"
    data-initial={initials}
    style="
        background-color: {color};
        font-size: {fontSize}px;
        color: {color.isLight() ? '#000' : '#fff'}
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

    let words: RegExpMatchArray;
    let clip: number;
    let fontSize: number;
    let initials: string;

    $: color = bg ? tinycolor(bg) : tinycolor.random();
    $: words = name.replace('.', '/').match(/\b(\w)|([A-Z])|(\/)/g);
    $: clip = len || words.length;
    $: fontSize = SIZE[size] * (1 / clip);
    $: initials = words.slice(0, clip).join('').toUpperCase();
</script>

<style lang="scss">
    @import 'spectre.css/src/variables';
    @import 'spectre.css/src/mixins';
    @import 'spectre.css/src/avatars';
    @import 'spectre.css/src/utilities';

    .avatar .avatar-icon {
        border-radius: 50%;
        padding: $unit-o $unit-h;
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
