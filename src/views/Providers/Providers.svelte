<div bind:clientWidth={width}>
    {#await $providers}
        <ProvidersLoader
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            count={cols}
            {radius}
            {height}
            {width}
        />
    {:then providers}
        <div class="columns">
            {#each providers as { id, attributes: { name, homepage, description } }}
                <div class="column col-{12 / cols} my-1">
                    <Popover>
                        <label
                            class:active={$selected.includes(id)}
                            slot="trigger"
                            class="c-hand"
                        >
                            <input
                                bind:group={$selected}
                                value={id}
                                type="checkbox"
                            />
                            <Avatar len={3} {size} {name} />
                        </label>
                        <Card>
                            <span slot="title" class="h6">{name}</span>
                            <span slot="subtitle" class="text-small text-gray">
                                {homepage || ''}
                            </span>
                            <span class="text-small">{description}</span>
                        </Card>
                    </Popover>
                </div>
            {/each}
        </div>
    {/await}
</div>

<script lang="ts" context="module">
    import type { Size } from '@/types/size';

    import { Sizes } from '@/types/enums';
    type Cols = 12 | 6 | 4 | 2 | 1;

    const cols: Cols = 12;
    const size: Size = 'lg';
    const height: number = +Sizes[size];
    const radius: number = height / 2;
</script>

<script lang="ts">
    import Popover from '@/layouts/Popover.svelte';
    import Card from '@/components/Card';
    import Avatar from '@/components/Avatar';
    import ProvidersLoader from './components/ProvidersLoader.svelte';

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
    .columns {
        justify-content: center;
    }
</style>
