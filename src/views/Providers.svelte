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
                        name="providers"
                        id={item.id}
                        value={item.id}
                        disabled={!item.attributes.base_url}
                        type="checkbox"
                        on:click={onProviderSelect}
                    />
                    <Avatar
                        status={$selectedProviders.includes(item.id) ? 'online' : 'offline'}
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
    import { query } from 'svelte-pathfinder';

    import Grid from '@/layouts/Grid.svelte';
    import Popover from '@/layouts/Popover.svelte';
    import Card from '@/layouts/Card.svelte';

    import Avatar from '@/components/Avatar';
    import * as Loader from '@/components/loaders';

    import providers, { selectedProviders, providersSync } from '@/stores/providers';

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

        const selected = $selectedProviders.includes(id);

        if (selected) {
            $query.params.providers = $selectedProviders.filter(pid => pid !== id);
        } else {
            $query.params.providers = [ ...$selectedProviders, id ];
        }

        if (augmentationMode) {
            if ( ! selected && exclusiveId === id) {
                exclusiveId = null;
                $query.params.providers = $providersSync.map(({ id }) => id);
                augmentationMode = false;
            }
        } else if (selected) {
            if (exclusiveId === id) {
                exclusiveId = null;
                $query.params.providers = $providersSync.map(({ id }) => id);
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
