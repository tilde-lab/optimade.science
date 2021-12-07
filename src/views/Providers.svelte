<div bind:clientWidth={width}>
    {#await $providers}
        <Loader.Avatars
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            count={cols}
            radius={24}
            {width}
        />
    {:then items}
        <Grid align="center" justify="center">
            {#each items as item}
                <Col col="1">
                    <Popover side="bottom">
                        <label class="text-center">
                            <input
                                name="providers"
                                id={item.id}
                                value={item.id}
                                disabled={!item.attributes.base_url}
                                type="checkbox"
                                on:click={onProviderSelect}
                            />
                            <Avatar
                                status={$selectedProviders.includes(item.id)
                                    ? 'online'
                                    : 'offline'}
                                name={item.attributes.name}
                                add={item.attributes.api_version}
                                id={item.id}
                                apiVersion={item.attributes.api_version}
                                len={4}
                                {size}
                            />
                        </label>
                        <Card slot="content">
                            <span slot="title" class="h6"
                                >{item.attributes.name}</span
                            >
                            <span slot="subtitle" class="text-small text-gray">
                                {item.attributes.homepage || ''}
                            </span>
                            <span class="text-small"
                                >{item.attributes.description}</span
                            >
                        </Card>
                    </Popover>
                </Col>
            {/each}
        </Grid>
    {/await}
</div>

<script lang="ts" context="module">
    import { query } from 'svelte-pathfinder';
    import { Avatar, Card, Col, Grid, Popover } from 'svelte-spectre';

    import * as Loader from '@/components/loaders';

    import providers, {
        selectedProviders,
        providersSync,
    } from '@/stores/providers';

    import type { Size } from 'svelte-spectre';
    import { SIZE } from 'svelte-spectre';

    type Cols = 12 | 6 | 4 | 3 | 2 | 1;

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
            $query.params.providers = $selectedProviders.filter(
                (pid) => pid !== id
            );
        } else {
            $query.params.providers = [...$selectedProviders, id];
        }

        if (augmentationMode) {
            if (!selected && exclusiveId === id) {
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
    .api-version {
        position: absolute;
    }
</style>
