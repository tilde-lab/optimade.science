<div class:d-flex={inline} class="form-group">
    {#if $$slots.default}
        <div class="col-2 col-{size}-12">
            <label for="input-{fid}" class="form-label label-{size}">
                <slot />
            </label>
        </div>
    {/if}
    <div
        class:has-icon-left={$$slots.iconLeft}
        class:has-icon-right={$$slots.iconRight}
        class:col-8={$$slots.default}
        class="col col-{size}-12"
    >
        {#if rows > 1}
            <textarea
                {...$$restProps}
                bind:value
                class:is-success={validity === 'success'}
                class:has-error={validity === 'error'}
                class="form-input input-{size}"
                id="input-{fid}"
                {rows}
                on:change
                on:input
            />
        {:else}
            <input
                {...$$restProps}
                bind:value
                class:is-success={validity === 'success'}
                class:has-error={validity === 'error'}
                class="form-input input-{size}"
                id="input-{fid}"
                on:change
                on:input
            />
        {/if}
        {#if $$slots.iconLeft}
            <span class="form-icon">
                <slot name="iconLeft" />
            </span>
        {/if}
        {#if $$slots.iconRight}
            <span class="form-icon">
                <slot name="iconRight" />
            </span>
        {/if}
    </div>
    {#if $$slots.hint}
        <div class="form-input-hint">
            <slot name="hint" />
        </div>
    {/if}
</div>

<script lang="ts" context="module">
    import type { Size } from '@/types/size';

    type Validity = 'success' | 'error' | false;

    export type { Size, Validity };
</script>

<script lang="ts">
    export let label: string = '';
    export let value: string = '';
    export let rows: number = 1;
    export let inline: boolean = false;
    export let validity: Validity = false;
    export let size: Size = 'md';

    const fid: number = Date.now();
</script>

<style lang="scss">
    @import 'spectre.css/src/forms';
    .form-icon > :global(*) {
        display: flex;
    }
    .label-xl {
        @extend .label-lg;
    }
    .label-xs {
        @extend .label-sm;
    }
    .input-xl {
        @extend .input-lg;
        height: $unit-12;
    }
    .input-xs {
        @extend .input-sm;
        height: $unit-5;
    }
</style>
