<section class="mt-2 py-1" style="margin-bottom:6vmin;">
    {#if heading}
        <div class="divider text-center" data-content={heading} />
    {/if}
    <div class="content">
        <slot />
    </div>
</section>

<script lang="ts">
    export let heading: string = '';
</script>

<style>
    .content {
        /* margin-top: 2rem; */
    }
    .divider::after {
        color: #7a2dd0;
        letter-spacing: 1.5px;
    }
</style>
