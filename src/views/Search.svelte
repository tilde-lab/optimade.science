<Input bind:value={$filter} size="lg" inline autofocus>
    <b class="float-right">filter=</b>
    <span slot="iconRight">
        {#await $results}
            <Icon icon="loading" />
        {:then _}
            <Icon icon="icon-search" />
        {/await}
    </span>
</Input>

<script lang="ts">
    import Input from '@/components/Input';
    import Icon from '@/components/Icon';
    import results, { filter } from '@/stores/search';
</script>
