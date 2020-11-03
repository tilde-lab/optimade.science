<TreeView {...treeViewOptions} {...$$restProps} />

<script context="module">
    const treeViewOptions = {
        readonly: true,
        withRootName: false,
        readonlyWhenFiltering: true,
        alwaysShowRoot: true,
        showCountOfObjectOrArray: true,
    };
</script>

<script>
    import TreeView from 'svelte-json-tree-view';
</script>