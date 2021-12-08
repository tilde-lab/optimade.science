<section style="margin: 2vmin auto 6vmin;">
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
    .content {
        margin-top: 2rem;
    }
    .divider::after {
        color: #7a2dd0 !important;
        letter-spacing: 1.5px;
        font-size: 1.05em !important;
    }
</style>
