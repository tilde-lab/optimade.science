{#if $total > 10}
    <nav class="p-sticky" style="top: 0; z-index: 100; background: white;">
        <Section>
            <Pagination
                bind:limit={$query.params.limit}
                bind:page={$query.params.page}
                total={$total}
                rest={7}
            />
        </Section>
    </nav>
{/if}

<script lang="ts" context="module">
    import { query } from 'svelte-pathfinder';
    import { Pagination } from 'svelte-spectre';
    import { total } from '@/stores/search';
    import Section from '@/layouts/Section.svelte';
</script>

<script lang="ts">
    $query.params.page = 1;
    $query.params.limit = 10;

    $: if (!$query.params.filter && !$query.params.providers) {
        $query.params.page = 1;
        $query.params.limit = 10;
    }
</script>
