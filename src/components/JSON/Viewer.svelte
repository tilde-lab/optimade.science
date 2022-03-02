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
        color: #3b4351;
        :global(.name) {
            color: #5755d9;
        }
        :global(.value.null),
        :global(.value.undefined) {
            color: #bcc3ce;
        }
        :global(.value.boolean),
        :global(.value.string),
        :global(.value.number) {
            color: #d73e48;
        }
        :global(.name:hover),
        :global(.value:hover) {
            background-color: #ffe9b3;
        }
    }

    @media (prefers-color-scheme: dark) {
        :global(.jsonView) {
            color: #bcc3ce;
            :global(.value.null),
            :global(.value.undefined) {
                color: #3b4351;
            }
        }
    }
    :global([color-scheme='dark']) {
        :global(.jsonView) {
            color: #bcc3ce;
            :global(.value.null),
            :global(.value.undefined) {
                color: #3b4351;
            }
        }
    }
    :global([color-scheme='light']) {
    }
</style>
