<section class="mt-2 py-1" style="margin-bottom: 2.5vmin;">
    {#if heading}
        <div
            class="divider text-center text-dark pb-2"
            data-content={heading}
        />
    {/if}
    <div class="content">
        <slot />
    </div>
</section>

<script lang="ts">
    export let heading: string = '';
</script>

<style>
    .divider::after {
        /* color: #7a2dd0 !important; */
        color: inherit !important;
        letter-spacing: 1.5px;
        font-size: 100% !important;
    }
</style>
