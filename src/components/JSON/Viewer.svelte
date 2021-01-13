<pre class="code" data-lang="JSON">
    <code>
        <IconButton
            size="sm"
            icon="icon-copy"
            style="position: absolute; top: 5px; left: 5px;"
            title="Copy JSON to clipboard"
            on:click={() => copy(json)}
        />
        <TreeView
            {...treeViewOptions}
            {...$$restProps}
            {value}
        />
    </code>
</pre>

<script lang="ts" context="module">
    import copy from 'copy-to-clipboard';
    import TreeView from 'svelte-json-tree-view';

    import { IconButton } from '@/components/Button';

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
    @import 'spectre.css/src/codes';
</style>
