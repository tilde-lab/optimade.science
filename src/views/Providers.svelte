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
                        class={`provider-checkbox`}
                        id={item.id}
                        value={item.id}
                        on:click={(event) => {
                            let classList = event.target.classList;
                            if (augmentation_mode) {
                                if (
                                    classList.contains('active') ||
                                    classList.contains('exclusive')
                                ) {
                                    const all = document.getElementsByClassName(
                                        'provider-checkbox'
                                    );
                                    $query.params.providers = [$query.params.providers];
                                    for (let i = 0; i < all.length; i++) {
                                        all[i].classList.remove('exclusive');
                                        all[i].classList.add('active');

                                        if (typeof $query.params.providers === 'string') {
                                            $query.params.providers = [
                                                $query.params.providers,
                                                all[i].id,
                                            ];
                                        } else {
                                            $query.params.providers.push(all[i].id);
                                        }
                                    }
                                    augmentation_mode = false;
                                } else {
                                    const all = document.getElementsByClassName(
                                        'provider-checkbox'
                                    );
                                    for (let i = 0; i < all.length; i++) {
                                        all[i].classList.remove('exclusive');
                                    }
                                    event.target.classList.add('exclusive');
                                    if (typeof $query.params.providers === 'string') {
                                        $query.params.providers = [
                                            $query.params.providers,
                                            item.id,
                                        ];
                                    } else {
                                        $query.params.providers.push(item.id);
                                    }
                                }
                            } else {
                                if (classList.contains('active')) {
                                    event.target.classList.remove('active');
                                    $query.params.providers = $query.params.providers.filter(
                                        (id) => id !== item.id
                                    );
                                } else if (classList.contains('exclusive')) {
                                    const all = document.getElementsByClassName(
                                        'provider-checkbox'
                                    );
                                    $query.params.providers = [];
                                    for (let i = 0; i < all.length; i++) {
                                        all[i].classList.remove('exclusive');
                                        all[i].classList.add('active');
                                        if (
                                            typeof $query.params.providers === 'string'
                                        ) {
                                            $query.params.providers = [
                                                $query.params.providers,
                                                all[i].id,
                                            ];
                                        } else {
                                            $query.params.providers.push(all[i].id);
                                        }
                                    }
                                } else {
                                    let all = document.getElementsByClassName(
                                        'provider-checkbox'
                                    );
                                    for (let i = 0; i < all.length; i++) {
                                        all[i].classList.remove('exclusive');
                                        all[i].classList.remove('active');
                                    }
                                    event.target.classList.add('exclusive');
                                    $query.params.providers = [item.id];
                                    augmentation_mode = true;
                                }
                            }
                        }}
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
