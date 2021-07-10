<div bind:clientWidth={width}>
    {#await $providers}
        <Loader.Avatars
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            count={cols}
            {width}
        />
    {:then items}
    <label>{$query.params.providers}</label>
        <Grid {items} {cols} style="justify-content: center;" let:item>
            <Popover pos="bottom">
                <label slot="trigger" on:click={(e)=>onClick(e, items)}>
                    <input
                        name="providers"
                        class={'provider-checkbox'}
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
</script>

<script lang="ts">
    let width: number = 0;
    let augmentation_mode = false;
    let providersMap = new Map();
    const INACTIVE = 'INACTIVE';
    const ACTIVE = 'ACTIVE';
    const EXCLUSIVE = 'EXCLUSIVE';


    function onClick(e, allProviders){
        const id = e.target.id;
        if(!id) return;

        query.update(q => {
            let queryParams = [];
            if (typeof q.params.providers === 'string') {
                queryParams = [q.params.providers];
            }

            allProviders.forEach(({id: providerKey})=>{
                // If don't have a provider in providers map
                if(!providersMap.get(providerKey)){
                    console.log('add', providerKey)
                    // If a provider in the params list than it is active
                    const state = queryParams.includes(providerKey) ? ACTIVE : INACTIVE;
                    providersMap.set(providerKey, state);
                }
            })

            const state = providersMap.get(id);
            if (augmentation_mode){
                if (state === ACTIVE || state === EXCLUSIVE){
                    providersMap.forEach((_, key)=>{
                        providersMap.set(key, ACTIVE);
                    })
                    augmentation_mode = false;
                } else {
                    providersMap.set(id, EXCLUSIVE);
                }
            } else {
                if (state === ACTIVE){
                    providersMap.set(id, INACTIVE);
                } else if (state === EXCLUSIVE){
                    providersMap.forEach((_, key)=>{
                        providersMap.set(key, ACTIVE);
                    })
                } else {
                    providersMap.forEach((_, key)=>{
                        providersMap.set(key, INACTIVE);
                    })
                    providersMap.set(id, EXCLUSIVE);
                    augmentation_mode = true;
                }
            }   

            q.params.providers = Array.from(providersMap).filter(([_, value])=> value !== INACTIVE).map(([key])=>key);
            return q;
        });
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
