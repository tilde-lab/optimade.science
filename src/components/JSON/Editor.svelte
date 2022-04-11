<CodeEditor {code} lang="json" autofocus={true} loc={true} {...$$restProps} on:change />

<script lang="ts" context="module">
	import 'prismjs/components/prism-json';
	import CodeEditor from 'svelte-code-editor';
</script>

<script lang="ts">
	export let code: string = '';
</script>

<style lang="scss" global>
	@import 'code';
</style>
