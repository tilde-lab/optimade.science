<Input bind:value={search} size="lg" inline autofocus>
    <b class="float-right">filter=</b>
    <span slot="iconRight">
        <Icon icon="loading" />
    </span>
</Input>

<script lang="ts">
    import Input from '@/components/Input';
    import Icon from '@/components/Icon';

    export let search: string = '';
</script>
