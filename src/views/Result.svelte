<div class="mb-2 pb-2">
    <Steps {steps} />
</div>
<div class="columns pt-2">
    <div class="column col-6">
        {#if data}
            <Input bind:value={filterText} placeholder="Field name..." />
            <small class="form-text text-muted">
                Filter data object by field name.
            </small>
            <JSON.Viewer value={data} caption="Optimade" {filterText} />
        {:else}
            <JSON.Editor
                style="width: 100%; height: 400px; margin-top: 0;"
                on:change={(e) => (code = e.detail)}
            />
        {/if}
    </div>
    <div class="divider-vert" data-content="&rarr;" />
    <div class="column">
        <ModuleSelect bind:selected={module} />
        <br />
        <Hero size="sm" bg="white">
            <div class="module">
                <iframe
                    name="visualisationFrame"
                    bind:this={iframe}
                    src={module?.value}
                    title="Module window"
                />
            </div>
        </Hero>
    </div>
</div>

<script lang="ts" context="module">
    import Hero from '@/layouts/Hero.svelte';
    import ModuleSelect from '@/views/ModuleSelect/ModuleSelect.svelte';
    import Input from '@/components/Input';
    import Steps from '@/components/Steps';
    import * as JSON from '@/components/JSON';

    const steps = [
        { label: 'Optimade JSON' },
        { label: 'Optimade module' },
    ];
</script>

<script lang="ts">
    export let data = null;

    let code: string;
    let module: any;
    let filterText: string = '';
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
