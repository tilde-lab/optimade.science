{#if $total > 10}
	<nav class="p-sticky" style="top: 0; z-index: 100;">
		<Section>
			<Pagination bind:limit={$query.params.limit} bind:page={$query.params.page} limits={[10, 50, 100]} total={$total} rest={7} />
		</Section>
	</nav>
{/if}

<script lang="ts" context="module">
	import { query } from 'svelte-pathfinder';
	import { total } from '@/stores/search';
	import { Pagination } from 'svelte-spectre';
	import Section from '@/layouts/Section.svelte';
</script>

<script lang="ts">
	$query.params.page = 1;
	$query.params.limit = 10;

	$: if (!$query.params.filter) {
		$query.params.page = 1;
		$query.params.limit = 10;
	}
</script>

<style lang="scss">
	nav {
		background: #fff;
	}
	@media (prefers-color-scheme: dark) {
		nav {
			background: #252b33;
		}
	}
	:global([color-scheme='dark']) {
		nav {
			background: #252b33;
		}
	}
	:global([color-scheme='light']) {
		nav {
			background: #fff;
		}
	}
</style>
