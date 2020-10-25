<Input bind:value={filterText} placeholder="Field name..." />
<small class="form-text text-muted">
    You can filter data object by field name.
</small>
<Switch label="Readonly" bind:value={readonly} />

<Hero size="sm">
    <TreeView {...treeViewOptions} value={result} {filterText} {readonly} />
</Hero>

<script lang="ts" context="module">
    const treeViewOptions = {
        expand: true,
        withRootName: false,
        readonlyWhenFiltering: true,
        alwaysShowRoot: true,
        showCountOfObjectOrArray: true,
    };
</script>

<script lang="ts">
    import Hero from '@/layouts/Hero.svelte';
    import Switch from '@/components/Switch';
    import Input from '@/components/Input';
    import TreeView from '@/components/TreeView';

    export let result = null;

    let readonly: boolean = true;
    let filterText: string = '';
</script>
