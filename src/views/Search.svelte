<Input
    bind:value={$query.filter}
    placeholder="Start typing to perform the search..."
    name="filter"
    type="search"
    size="lg"
    inline
    autofocus
>
    <b class="float-right">filter=</b>
    <span slot="iconRight">
        {#await $results}
            <Icon icon="loading" />
        {:then _}
            {#if $query.filter}
                <IconButton
                    size="sm"
                    icon="icon-cross"
                    style="display: flex;"
                    on:click={() => ($query.filter = '')}
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
