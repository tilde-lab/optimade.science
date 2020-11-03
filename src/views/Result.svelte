<div class="mb-2 pb-2">
    <Steps {steps}/>
</div>
<div class="columns pt-2">
  <div class="column">
    {#if data}
        <Input bind:value={filterText} placeholder="Field name..." />
        <small class="form-text text-muted">
            You can filter data object by field name.
        </small>
        <Hero size="sm">
            <JSON.Viewer value={data} {filterText} />
        </Hero>
    {:else}
        <JSON.Editor 
            style="width: 100%; height: 400px; margin-top: 0;" 
            on:change={e => code = e.detail} 
        />
    {/if}
  </div>
  <div class="divider-vert" data-content="&rarr;"></div>
  <div class="column">
    {#await $modules then items}
        <Select 
            {items} 
            bind:selectedValue={src} 
            placeholder="Select exisitng module or enter an URL"
            noOptionsMessage="No modules added"
        />
    {/await}
    <small class="form-text text-muted">
        Use <code>window.__OPRIMADE_DATA__</code> to access JSON
    </small>
    <Hero size="sm">
        <div class="module">
            <iframe bind:this={iframe} {src}></iframe>
        </div>
    </Hero>
  </div>
</div>

<script lang="ts" context="module">
    const steps = [
        { label: 'JSON' },
        { label: 'Module' }
    ];
</script>

<script lang="ts">
    import Hero from '@/layouts/Hero.svelte';
    import Input from '@/components/Input';
    import Steps from '@/components/Steps';
    import Select from '@/components/Select';
    import * as JSON from '@/components/JSON';

    import modules from '@/stores/modules';

    export let data = null;

    let code: string;
    let src: string;
    let filterText: string = '';

    let iframe;
    $: if (iframe) {
        iframe.contentWindow.__OPRIMADE_DATA__ = data;
    }
    $: if (iframe) {
        iframe.contentWindow.__OPRIMADE_DATA__ = code;
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
