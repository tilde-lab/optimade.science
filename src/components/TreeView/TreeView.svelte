<div
    use:JSONTreeView={{ caption, ...$$restProps }}
    on:change
    on:rename
    on:delete
    on:append
    on:click
    on:expand
    on:collapse
    on:refresh
/>

<script lang="ts">
    import JSONTreeView from './JSONTreeView';
    export let caption: string = 'JSON';
</script>

<style global>
    @import 'json-tree-view/devtools.css';
</style>
