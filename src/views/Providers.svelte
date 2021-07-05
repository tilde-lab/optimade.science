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
                <label slot="trigger" on:click={onClick}>
                    <input
                        name="providers"
                        class={`provider-checkbox`}
                        id={item.id}
                        value={item.id}
                        disabled={!item.attributes.base_url}
                        type="checkbox"
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
    let augmentation_mode = false;

    
</script>

<script lang="ts">
    let width: number = 0;
    // const providersList =  $providers;

    async function onClick(e){
        const id = e.target.id;
        if(!id) return;
        // const p = await $providers;
        if($query.params.providers.includes(e.target.id)){
            $query.params.providers = $query.params.providers.filter(p => p !== id);
        } else {
            $query.params.providers = [...$query.params.providers, id]
        }
        console.log($query.params.providers);
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
