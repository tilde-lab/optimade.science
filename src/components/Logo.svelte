<div class="logo">
	<div class:spin in:receive={{ key, duration }} out:send={{ key, duration }} style="width: {dim}px; height: {dim}px;">
		{@html logo}
	</div>
</div>

<script lang="ts" context="module">
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	import type { Zoom } from '@/types/size';
	import { ZOOM } from '@/types/const';

	export type { Zoom };

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),
		fallback(node, { duration = 600, easing = quintOut }) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration,
				easing,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
			};
		},
	});
</script>

<script lang="ts">
	import logo from '@/assets/logo.svg';

	export let key: string | number = 'logo';
	export let duration: number;
	export let size: Zoom = '1x';
	export let spin = false;

	$: dim = ZOOM[size] * 50;
</script>

<style>
	.logo {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.logo > div {
		position: relative;
		transition-duration: 0.5s;
		transition-property: top left;
	}
	.logo > div > :global(svg) {
		width: 100%;
		position: absolute;
		top: 25%;
		left: 25%;
		margin-top: -25%;
		margin-left: -25%;
	}
	.logo > div.spin > :global(svg) {
		animation: spin 2s ease infinite;
	}
	@keyframes spin {
		100% {
			transform: rotate(360deg);
		}
	}
</style>
