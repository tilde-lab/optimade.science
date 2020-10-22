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
</figure>

<script lang="ts" context="module">
    import type { Size } from '@/types/size';
    import type { Weight } from '@/types/text';
    import { SIZE } from '@/types/const';
    export type { Size, Weight };
</script>

<script lang="ts">
    import tinycolor from 'tinycolor2';

    export let name: string = '';
    export let size: Size = 'nm';
    export let weight: Weight = 'normal';
    export let bg: string = '';
    export let len: number = 0;

    let worlds: RegExpMatchArray;
    let clip: number;
    let fontSize: number;
    let initials: string;

    $: color = bg ? tinycolor(bg) : tinycolor.random();
    $: worlds = name.replace('.', '/').match(/\b(\w)|([A-Z])|(\/)/g);
    $: clip = len || worlds.length;
    $: fontSize = SIZE[size] * (1 / clip);
    $: initials = worlds.slice(0, clip).join('').toUpperCase();
</script>

<style lang="scss">
    @import 'spectre.css/src/variables';
    @import 'spectre.css/src/mixins';
    @import 'spectre.css/src/avatars';
    @import 'spectre.css/src/utilities';
</style>
