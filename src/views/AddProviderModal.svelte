<Modal bind:open size="md">
	<span slot="default" class="add-provider-trigger" aria-hidden="true" />
	<div slot="content">
		<h3 class="h5">Add custom provider</h3>
		<p class="text-gray text-small">
			Enter the OPTIMADE base URL of a provider that is not listed above. The provider will be saved as <code>custom</code> and can be selected like any other.
		</p>

		<form on:submit|preventDefault={onSubmit}>
			<div class="form-group">
				<label class="form-label" for="custom-provider-url">Base URL</label>
				<Input
					id="custom-provider-url"
					type="url"
					placeholder="https://example.org/optimade"
					bind:value={url}
					validity={error ? 'error' : validity}
					disabled={submitting}
					on:input={onInput}
				/>
				{#if error}
					<p class="form-input-hint is-error">{error}</p>
				{/if}
			</div>

			<div class="btn-group">
				<Button type="submit" variant="primary" disabled={submitting}>
					{submitting ? 'Adding…' : 'Add provider'}
				</Button>
				<Button variant="link" disabled={submitting} on:click={() => (open = false)}>Cancel</Button>
			</div>
		</form>
	</div>
</Modal>

<script lang="ts" context="module">
	import { Button, Input } from 'svelte-spectre';
	import { query } from 'svelte-pathfinder';

	import Modal from '@/layouts/Modal.svelte';
	import { addCustomProvider, customId } from '@/stores/custom-providers';
	import { selectedProviders } from '@/stores/providers';
</script>

<script lang="ts">
	export let open = false;

	let url = '';
	let error = '';
	let validity: 'success' | 'error' | undefined = undefined;
	let submitting = false;

	function onInput() {
		if (error) {
			error = '';
			validity = undefined;
		}
	}

	async function onSubmit() {
		const value = (url || '').trim();
		if (!value) {
			error = 'Base URL is required';
			validity = 'error';
			return;
		}

		error = '';
		validity = undefined;
		submitting = true;
		try {
			await addCustomProvider(value);

			// Select the newly-added custom provider in the URL so it becomes
			// active immediately, mirroring the existing onProviderSelect flow.
			$query.params.page = 1;
			$query.params.limit = 10;
			const selected = $selectedProviders.includes(customId);
			if (!selected) {
				$query.params.providers = [...$selectedProviders, customId];
			}

			open = false;
			url = '';
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to add provider';
			validity = 'error';
		} finally {
			submitting = false;
		}
	}
</script>

<style>
	.btn-group {
		margin-top: 1rem;
	}
	.form-input-hint {
		margin-top: 0.3rem;
	}
	:global(.add-provider-trigger) {
		display: inline-block;
		width: 0;
		height: 0;
		overflow: hidden;
	}
</style>
