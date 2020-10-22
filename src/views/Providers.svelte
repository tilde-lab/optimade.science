<div bind:clientWidth={width}>
    {#await $providers}
        <Loader.Avatars
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            count={cols}
            {radius}
            {height}
            {width}
        />
    {:then providers}
        <Grid
            items={providers}
            {cols}
            style="justify-content: center;"
            let:item
        >
            <Popover>
                <label
                    class:active={$selected.includes(item.id)}
                    slot="trigger"
                    class="c-hand"
                >
                    <input
                        bind:group={$selected}
                        value={item.id}
                        type="checkbox"
                    />
                    <Avatar name={item.attributes.name} len={3} {size} />
                </label>
                <Card>
                    <span slot="title" class="h6">{item.attributes.name}</span>
                    <span slot="subtitle" class="text-small text-gray">
                        {item.attributes.homepage || ''}
                    </span>
                    <span
                        class="text-small"
                    >{item.attributes.description}</span>
                </Card>
            </Popover>
        </Grid>
    {/await}
</div>

<script lang="ts" context="module">
    import type { Size } from '@/types/size';
    import type { Cols } from '@/layouts/Grid.svelte';

    import { SIZE } from '@/types/const';

    const cols: Cols = 12;
    const size: Size = 'lg';
    const height: number = SIZE[size];
    const radius: number = height / 2;
</script>

<script lang="ts">
    import Grid from '@/layouts/Grid.svelte';
    import Popover from '@/layouts/Popover.svelte';

    import Card from '@/components/Card';
    import Avatar from '@/components/Avatar';

    import * as Loader from '@/components/loaders';

    import providers, { selected } from '@/stores/providers';

    let width = 0;
</script>

<style>
    input[type='checkbox'] {
        display: none;
    }
    label {
        display: block;
        opacity: 0.2;
    }
    label.active {
        opacity: 1;
    }
</style>
