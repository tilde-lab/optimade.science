<svelte:options immutable={false} />

<div bind:clientWidth={width}>
    {#await $providers}
        <Loader.Avatars
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            count={cols}
            {width}
        />
    {:then items}
        <Grid {items} {cols} style="justify-content: center;" let:item>
            <Popover pos="bottom">
                <label slot="trigger">
                    <input
                        bind:group={$query.params.providers}
                        name="providers"
                        id={item.id}
                        value={item.id}
                        disabled={!item.attributes.base_url}
                        type="checkbox"
                        on:click={onProviderSelect}
                    />
                    <Avatar
                        status={$query.params.providers.includes(item.id) ? 'online' : 'offline'}
                        name={item.attributes.name}
                        id={item.id}
                        apiVersion={item.attributes.api_version}
                        len={3}
                        {size}
                    />
                </label>
                <Card>
                    <span slot="title" class="h6">{item.attributes.name}</span>
                    <span slot="subtitle" class="text-small text-gray">
                        {item.attributes.homepage || ''}
                    </span>
                    <span class="text-small">{item.attributes.description}</span
                    >
                </Card>
            </Popover>
        </Grid>
    {/await}
</div>

<script lang="ts" context="module">
    import { tick } from 'svelte';
    import { query } from 'svelte-pathfinder';

    import Grid from '@/layouts/Grid.svelte';
    import Popover from '@/layouts/Popover.svelte';
    import Card from '@/layouts/Card.svelte';

    import Avatar from '@/components/Avatar';
    import * as Loader from '@/components/loaders';

    import providers from '@/stores/providers';

    import type { Size } from '@/types/size';
    import type { Cols } from '@/layouts/Grid.svelte';

    import { SIZE } from '@/types/const';

    const cols: Cols = 12;
    const size: Size = 'lg';
    const height: number = SIZE[size];
    const radius: number = height / 2;
</script>

<script lang="ts">
    let width: number = 0;

    let exclusiveId = null;
    let augmentationMode = false;

    async function onProviderSelect(e) {
        const id = e.target.id;
        if (!id) return;

        await tick();

        const allProviders = await $providers;
        const selectedProviders = Array.isArray($query.params.providers) ? 
                                    $query.params.providers : 
                                    [$query.params.providers];

        const selected = selectedProviders.includes(id);

        if (augmentationMode) {
            if (selected && exclusiveId === id) {
                exclusiveId = null;
                $query.params.providers = allProviders.map(({ id }) => id);
                augmentationMode = false;
            }
        } else if ( ! selected) {
            if (exclusiveId === id) {
                exclusiveId = null;
                $query.params.providers = allProviders.map(({ id }) => id);
            } else {
                $query.params.providers = [id];
                exclusiveId = id;
                augmentationMode = true;
            }
        }
    }
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
