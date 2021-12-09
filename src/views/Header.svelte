<header class="p-1">
    <Navbar>
        <div slot="center">
            {#if !$providersSync.length || $query.params.filter}
                <Logo spin={!$providersSync.length} />
            {/if}
        </div>
        <nav slot="right">
            <Modal bind:open>
                <Button on:click={() => (open = true)} variant="primary">
                    My modules
                </Button>
                <div slot="content">
                    <Result />
                </div>
            </Modal>
        </nav>
    </Navbar>
</header>

<script lang="ts" context="module">
    import { query } from 'svelte-pathfinder';
    import { Button, IconButton, Navbar, Steps } from 'svelte-spectre';

    import Modal from '@/layouts/Modal.svelte';
    import Result from '@/views/Result.svelte';
    import Logo from '@/components/Logo.svelte';

    import { providersSync } from '@/stores/providers';
</script>

<script lang="ts">
    let open: boolean = false;
    const steps = [{ label: 'Optimade JSON' }, { label: 'Optimade module' }];
</script>
