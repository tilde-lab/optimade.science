<div class="card">
    {#if $$slots.poster}
        <div class="card-image">
            <slot name="poster" />
        </div>
    {/if}
    <div class="card-header">
        {#if $$slots.title}
            <div class="card-title">
                <slot name="title" />
            </div>
        {/if}
        {#if $$slots.subtitle}
            <div class="card-subtitle">
                <slot name="subtitle" />
            </div>
        {/if}
    </div>
    {#if $$slots.default}
        <div class="card-body">
            <slot />
        </div>
    {/if}
    {#if $$slots.footer}
        <div class="card-footer">
            <slot name="footer" />
        </div>
    {/if}
</div>

<script lang="ts">
    export let img: string = '';
    export let title: string = '';
    export let subtitle: string = '';
</script>

<style lang="scss">
    @import 'spectre.css/src/variables';
    @import 'spectre.css/src/mixins';
    @import 'spectre.css/src/cards';
    .card-title,
    .card-subtitle {
        word-break: break-all;
    }
</style>
