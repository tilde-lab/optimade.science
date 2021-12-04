{#if total > 10}
    <nav class="p-sticky" style="top: 0; z-index: 100; background: white;">
        <Section>
            <Pagination
                bind:limit={$query.params.limit}
                bind:page={$query.params.page}
                bind:total
                rest={7}
            />
        </Section>
    </nav>
{/if}

<script lang="ts" context="module">
    import { query } from 'svelte-pathfinder';
    import { Pagination } from 'svelte-spectre';
    import { getTotal, searchAll } from '@/stores/search';
    import Section from '@/layouts/Section.svelte';
</script>

<script lang="ts">
    let total = 0;

    $query.params.page = 1;
    $query.params.limit = 10;

    $: if ($query.params.filter && $query.params.providers) {
    } else {
        $query.params.page = 1;
        $query.params.limit = 10;
    }
    $: ($query.params.filter || $query.params.providers) &&
        $getTotal.then((t) => (total = t));

    // async function getTotal(searchAll) {
    //     const fetchedProviders = await searchAll;
    //     const filteredProviders = fetchedProviders.filter(
    //         ([apis, provider]) =>
    //             apis &&
    //             apis.some((a) => !(a instanceof Error) && a?.data.length)
    //     );
    //     const returnedTotals = filteredProviders.reduce(
    //         (acc, [apis, provider]) => {
    //             const returned =
    //                 apis[0].meta.data_returned /
    //                 (apis[0].meta.data_returned > 10000 ? 100 : 1);
    //             acc = acc.length ? [...acc, returned] : [returned];
    //             return acc;
    //         },
    //         []
    //     );
    //     console.log(
    //         filteredProviders,
    //         returnedTotals,
    //         $query.params.filter,
    //         $query.params.providers
    //     );
    //     return returnedTotals.length ? Math.max(...returnedTotals) : 0;
    // }
</script>
