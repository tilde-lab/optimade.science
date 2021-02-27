<Input
    bind:value={$query.params.filter}
    placeholder="Start typing..."
    name="filter"
    type="search"
    size="lg"
    inline
    autofocus
>
    <span class="float-right" style="font-family:Courier;letter-spacing:0.5px;">filter=</span>
    <span slot="iconRight">
        {#await $results}
            <Icon icon="loading" />
        {:then _}
            {#if $query.params.filter}
                <IconButton
                    size="sm"
                    icon="icon-cross"
                    style="display: flex;"
                    on:click={() => ($query.params.filter = '')}
                />
            {:else}
                <Icon icon="icon-search" />
            {/if}
        {/await}
    </span>
</Input>

<script lang="ts" context="module">
    import { query } from 'svelte-pathfinder';

    import Input from '@/components/Input';
    import { IconButton } from '@/components/Button';
    import Icon from '@/components/Icon';

    import results from '@/stores/search';
</script>
