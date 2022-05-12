<Code lang="JSON">
	<IconButton size="sm" icon="copy" style="position: absolute !important; top: 5px; left: 5px;" title="Copy JSON to clipboard" on:click={() => copy(json)} />
	<section use:jsonViewer={filter} />
</Code>

<script lang="ts" context="module">
	import jsontree from './jsontree/jsontree';
	import { Code, IconButton } from 'svelte-spectre';
</script>

<script lang="ts">
	export let value: string | object | null = null,
		filter = '';

	$: json = JSON.stringify(value);

	const copy = (value: string) => navigator.clipboard.writeText(value);

	function jsonViewer(node: HTMLElement, filter = '') {
		const tree = jsontree.renderJSON(json, node);

		function update(filter: string) {
			if (filter) jsontree.filter(tree, filter);
			else jsontree.collapse(tree);
		}
		function destroy() {
			jsontree.destroy(tree);
		}
		return { update, destroy };
	}
</script>

<style lang="scss" global>
	@import 'jsontree/jsontree.scss';

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
