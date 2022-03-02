<Code lang="JSON">
    <IconButton
        size="sm"
        icon="copy"
        style="position: absolute !important; top: 5px; left: 5px;"
        title="Copy JSON to clipboard"
        on:click={() => copy(json)}
    />
    <TreeView {...treeViewOptions} {...$$restProps} {value} />
</Code>

<script lang="ts" context="module">
    import copy from 'copy-to-clipboard';
    import TreeView from 'svelte-json-tree-view';
    import { Code, IconButton } from 'svelte-spectre';

    const treeViewOptions = {
        readonly: true,
        withRootName: false,
        readonlyWhenFiltering: true,
        alwaysShowRoot: true,
        showCountOfObjectOrArray: true,
    };
</script>

<script lang="ts">
    export let value: {} | [] | null = null;

    $: json = JSON.stringify(value);
</script>

<style lang="scss">
    :global(.jsonView) {
        user-select: text;
    }
</style>
