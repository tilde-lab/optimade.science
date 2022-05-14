<svelte:window on:click={click} />

<Spectre>
	<Header />
	<Container>
		{#if $providersSync.length && !$query.params.filter}
			<div class="my-2">
				<Logo size="4x" />
			</div>
		{/if}
		<Section>
			<Search />
		</Section>
		<Section>
			<Providers />
		</Section>
		<Paginator />
		<main>
			<Results />
		</main>
	</Container>
	<Footer />
</Spectre>

<script lang="ts" context="module">
	import { click, prefs, query } from 'svelte-pathfinder';

	import { Container, Spectre } from 'svelte-spectre';

	import Section from '@/layouts/Section.svelte';

	import Header from '@/views/Header.svelte';
	import Footer from '@/views/Footer.svelte';
	import Search from '@/views/Search.svelte';
	import Results from '@/views/Results.svelte';
	import Paginator from '@/views/Paginator.svelte';
	import Providers from '@/views/Providers.svelte';

	import Logo from '@/components/Logo.svelte';

	import { providersSync } from '@/stores/providers';

	prefs.array.format = 'separator';
</script>

<style lang="scss">
	// footer {
	//     position: fixed;
	//     bottom: 0;
	//     z-index: 999;
	//     text-align: center;
	//     font-size: 0.75rem;
	//     background: #f1f1fc;
	//     padding: 0.75rem;
	//     width: 100%;
	// }
	// footer a {
	//     text-decoration: none;
	// }
	// @media (prefers-color-scheme: dark) {
	//     footer {
	//         background: #343a51;
	//     }
	// }
	// [color-scheme='dark'] {
	//     footer {
	//         background: #343a51;
	//     }
	// }
</style>
