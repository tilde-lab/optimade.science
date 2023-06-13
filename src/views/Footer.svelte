<footer class="py-2 mt-2">
	<Container>
		<Grid>
			<Col>
				This <a href="https://github.com/tilde-lab/optimade.science" target="_blank">open-source</a>
				app is possible thanks to the
				<a href="http://www.optimade.org" target="_blank">OPTIMADE</a> standard.<br />No cookies or trackers are used.
			</Col>
			<Col col="auto">
				<Switch bind:value={$darkTheme}>Dark theme</Switch>
			</Col>
		</Grid>
	</Container>
</footer>

<script lang="ts">
	import { Col, Grid, Container, Switch } from 'svelte-spectre';

	import { nodeAttribute } from '@/helpers/helpers';

	import { darkTheme } from '@/stores/theme';

	$: nodeAttribute(document.documentElement, 'color-scheme', $darkTheme ? 'dark' : 'light');
</script>

<style lang="scss">
	:global(body),
	:global(html) {
		height: 100%;
		:global(.spectre) {
			min-height: 100%;
			display: grid !important;
			grid-template-rows: auto 1fr auto;
		}
	}
	@media (prefers-color-scheme: dark) {
		footer {
			background-color: #343a51;
		}
	}
	:global([color-scheme='dark']) {
		footer {
			background-color: #343a51;
		}
	}
	:global([color-scheme='light']) {
		footer {
			background-color: #f1f1fc;
		}
	}
</style>
