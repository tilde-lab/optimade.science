<Input
    bind:value={$query.filter}
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
                <Button
                    size="sm"
                    shape="square"
                    variant="link"
                    style="display: flex;"
                    on:click={() => ($query.filter = '')}
                >
                    <Icon icon="icon-cross" />
                </Button>
            {:else}
                <Icon icon="icon-search" />
            {/if}
        {/await}
    </span>
</Input>

<script lang="ts">
    import Input from '@/components/Input';
    import Button from '@/components/Button';
    import Icon from '@/components/Icon';
    import { query } from 'svelte-pathfinder';
    import results from '@/stores/search';
</script>
