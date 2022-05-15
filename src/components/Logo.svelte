<div class="logo">
	<div class:spin in:receive={{ key, duration }} out:send={{ key, duration }} style="width: {dim}px; height: {dim}px;">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55">
			<path stroke="#9ed700" stroke-width="1.15" d="m27 14.5 11-6.553" />
			<path stroke="#00acd9" stroke-width="1.15" d="M37.825 33.25 38 46.053" />
			<path stroke="#7a2dd0" stroke-width="1.15" d="M16.175 33.25 5 27" />
			<path stroke="#00acd9" stroke-width="1.15" d="M49 27 38 46.053" />
			<path stroke="#f1f1f1" stroke-width="2" d="M38 46.053H16" />
			<path stroke="#7a2dd0" stroke-width="1.15" d="M16 46.053 5 27" />
			<path stroke="#f1f1f1" stroke-width="2" d="M5 27 16 7.947" />
			<path stroke="#9ed700" stroke-width="1.15" d="M16 7.947h22" />
			<path stroke="#f1f1f1" stroke-width="2" d="M38 7.947 49 27" />
			<circle cx="49" cy="27" r="3.5" fill="#00acd9" />
			<circle cx="38" cy="46.053" r="3.5" fill="#00acd9" />
			<circle cx="16" cy="46.053" r="3.5" fill="#7a2dd0" />
			<circle cx="5" cy="27" r="3.5" fill="#7a2dd0" />
			<circle cx="16" cy="7.947" r="3.5" fill="#9ed700" />
			<circle cx="38" cy="7.947" r="3.5" fill="#9ed700" />
			<path
				stroke="#ff414d"
				d="m27 39.5-10.825-6.25M16.175 33.25v-12.5M16.175 20.75 27 14.5M27 14.5l10.825 6.25M37.825 20.75v12.5M37.825 33.25 27 39.5"
			/>
			<circle cx="27" cy="39.5" r="2.5" fill="#ff414d" />
			<circle cx="16.175" cy="33.25" r="2.5" fill="#ff414d" />
			<circle cx="16.175" cy="20.75" r="2.5" fill="#ff414d" />
			<circle cx="27" cy="14.5" r="2.5" fill="#ff414d" />
			<circle cx="37.825" cy="20.75" r="2.5" fill="#ff414d" />
			<circle cx="37.825" cy="33.25" r="2.5" fill="#ff414d" />
		</svg>
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
