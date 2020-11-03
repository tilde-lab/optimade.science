<CodeEditor 
    {code}
    lang="json" 
    autofocus={true} 
    loc={true} 
    {...$$restProps} 
    on:change
/>

<script lang="ts">
    import CodeEditor from 'svelte-code-editor';
    import 'prismjs/components/prism-json';

    export let code: string = '';
</script>