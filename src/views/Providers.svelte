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
            <Popover pos="bottom">
                <label slot="trigger">
                    <input
                        bind:group={$query.providers}
                        name="providers"
                        value={item.id}
                        type="checkbox"
                    />
                    <Avatar
                        status={$query.providers.includes(item.id) ? 'online' : 'offline'}
                        name={item.attributes.name}
                        len={3}
                        {size}
                    />
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
    import Card from '@/layouts/Card.svelte';

    import Avatar from '@/components/Avatar';

    import * as Loader from '@/components/loaders';

    import { query } from 'svelte-pathfinder';

    import providers from '@/stores/providers';

    let width = 0;
</script>

<style>
    input[type='checkbox'] {
        display: none;
    }
    label {
        display: block;
        cursor: pointer;
    }
</style>