<div class="mb-2 pb-2">
	<Steps {steps} active={2} />
</div>
<div class="pt-2">
	<Grid>
		<Col col="6" md="12">
			{#if data}
				<Input bind:value={filter} placeholder="Field name..." />
				<small class="form-text text-muted"> Filter data object by field name. </small>
				<JSON.Viewer value={data} caption="Optimade" {filter} />
			{:else}
				<JSON.Editor style="width: 100%; height: 400px; margin-top: 0;" on:change={(e) => (code = e.detail)} />
			{/if}
		</Col>
		<Divider text={windowWidth <= 600 ? '↓' : '→'} align={windowWidth <= 600 ? 'horizontal center' : 'vertical'} />
		<Col col="5" md="12">
			<ModuleSelect bind:selectedValue={module} />
			<br />
			<Hero size="sm" bg={$media.dark ? 'dark' : 'gray'}>
				<div class="module">
					<iframe name="visualisationFrame" bind:this={iframe} src={module} title="Module window" />
				</div>
			</Hero>
		</Col>
	</Grid>
</div>

<svelte:window bind:innerWidth={windowWidth} />

<script lang="ts" context="module">
	import { Col, Divider, Grid, Hero, Input, Steps } from 'svelte-spectre';
	import { media } from '@/stores/media';

	import ModuleSelect from '@/views/ModuleSelect/ModuleSelect.svelte';
	import * as JSON from '@/components/JSON';

	const steps = [{ label: 'Optimade JSON' }, { label: 'Optimade module' }];
</script>

<script lang="ts">
	export let data: {} | null | undefined = null,
		windowWidth = 0;

	let code: string;
	let module: any;
	let filter = '';
	let iframe: HTMLIFrameElement | null;

	$: if (iframe) {
		const message = data || code;
		iframe.onload = function () {
			// We wait untill we get a link with a visualisation file
			const timer = setInterval(() => {
				const visualisationFrame = window.frames.visualisationFrame;

				// If we get a frame we send a custom message and clear interval
				if (visualisationFrame) {
					visualisationFrame.postMessage(message, '*');
					clearInterval(timer);
				}
			}, 500);
		};
	}
</script>

<style>
	.module {
		overflow: hidden;
		padding-top: 56.25%;
		position: relative;
	}
	.module iframe {
		border: 0;
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
	}
</style>
