<div class="p-1">
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
                    <IconButton
                        icon="icon-cross"
                        style="float: right; margin-top: -0.8rem;"
                        on:click={() => (open = false)}
                    />
                    <Result />
                </div>
            </Modal>
        </nav>
    </Navbar>
</div>

<script lang="ts" context="module">
    import { query } from 'svelte-pathfinder';

    import Navbar from '@/layouts/Navbar.svelte';
    import Modal from '@/layouts/Modal.svelte';
    import Button, { IconButton } from '@/components/Button';
    import Result from '@/views/Result.svelte';

    import Logo from '@/components/Logo.svelte';

    import { providersSync } from '@/stores/providers';
</script>

<script lang="ts">
    let open: boolean = false;
</script>
