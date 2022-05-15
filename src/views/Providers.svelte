<div bind:clientWidth={width}>
	{#await $providers}
		<Loader.Avatars backgroundColor="#f3f3f3" foregroundColor="#ecebeb" count={12} radius={24} {width} />
	{:then items}
		<Grid align="center" justify="center" oneline={$media.sm} gapless={$media.sm}>
			{#each items as item}
				<Col col={$media.sm ? '' : 1}>
					<Popover side="bottom">
						<label class="text-center">
							<input
								name="providers"
								id={item.id}
								value={item.id}
								disabled={!item.attributes.base_url}
								type="checkbox"
								on:click={onProviderSelect}
							/>
							<Avatar
								custom
								status={$selectedProviders && statusing(item)}
								name={naming(item)}
								id={item.id}
								apiVersion={item.attributes.api_version}
								len={4}
								size="lg"
							/>
						</label>
						<Card slot="content">
							<img class="provider-logo" src={item.attributes.img} alt={item.attributes.name} />
							<span slot="title" class="h6">{item.attributes.name}</span>
							<a slot="subtitle" href={item.attributes.homepage || ''} target="_blank" class="text-small text-gray">
								{item.attributes.homepage || ''}
							</a>
							<span class="text-small">{item.attributes.description}</span>
						</Card>
					</Popover>
				</Col>
			{/each}
		</Grid>
	{/await}
</div>

<script lang="ts" context="module">
	import { query } from 'svelte-pathfinder';
	import { Avatar, Card, Col, Grid, Popover } from 'svelte-spectre';
	import { getPredefinedInitials } from '@/helpers/getPredefinedInitials';
	import { media } from '@/stores/media';

	import * as Loader from '@/components/loaders';
	import providers, { selectedProviders, providersSync } from '@/stores/providers';

	// @ts-ignore
	import mcloud from '@/assets/providers/mcloud.png';
	// @ts-ignore
	import COD from '@/assets/providers/COD.png';
	// @ts-ignore
	import MP from '@/assets/providers/MP.png';
	// @ts-ignore
	import MPDS from '@/assets/providers/MPDS.png';
	// @ts-ignore
	import NMD from '@/assets/providers/NMD.png';
	// @ts-ignore
	import OPT from '@/assets/providers/OPT.png';
	// @ts-ignore
	import TCO from '@/assets/providers/TCO.png';
	// @ts-ignore
	import DM2 from '@/assets/providers/DM2.png';

	import type { Types } from 'optimade';

	interface Logos {
		[key: string]: string;
	}
</script>

<script lang="ts">
	let width = 0,
		exclusiveId: null,
		augmentationMode = false;

	const logos: Logos = { COD: COD, MP: MP, MPDS: MPDS, NMD: NMD, OPT: OPT, TCO: TCO, '2DM': DM2 };

	function statusing(item: Types.Provider) {
		return $selectedProviders.includes(item.id) ? 'online' : 'offline';
	}

	function naming(item: Types.Provider) {
		const words = item.attributes.name.replace('.', '/').match(/\b(\w)|([A-Z])|(\/)/g);
		const initials = getPredefinedInitials(item.id, words.slice(0, 3).join('').toUpperCase());

		item.attributes.img = logos[initials] ? logos[initials] : mcloud;

		return `${initials.toUpperCase()} v${item.attributes.api_version}`;
	}

	async function onProviderSelect(e: CustomEvent) {
		$query.params.page = 1;
		$query.params.limit = 10;

		const id = e.target.id;
		if (!id) return;

		const selected = $selectedProviders.includes(id);

		if (selected) {
			$query.params.providers = $selectedProviders.filter((pid) => pid !== id);
		} else {
			$query.params.providers = [...$selectedProviders, id];
		}

		if (augmentationMode) {
			if (!selected && exclusiveId === id) {
				exclusiveId = null;
				$query.params.providers = $providersSync.map(({ id }) => id);
				augmentationMode = false;
			}
		} else if (selected) {
			if (exclusiveId === id) {
				exclusiveId = null;
				$query.params.providers = $providersSync.map(({ id }) => id);
			} else {
				$query.params.providers = [id];
				exclusiveId = id;
				augmentationMode = true;
			}
		}
	}
</script>

<style>
	:global(.spectre .columns.col-oneline) {
		max-width: 95.5vw;
		justify-content: start;
	}
	input[type='checkbox'] {
		display: none;
	}
	label {
		display: block;
		cursor: pointer;
	}
	.provider-logo {
		max-width: 75%;
		display: block;
		margin: 0 auto 1em;
	}
</style>
