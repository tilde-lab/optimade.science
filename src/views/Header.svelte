<div class="p-1">
    <Navbar>
        <nav slot="left">
            <Button href="#" variant="link">Link</Button>
            <Button href="#">Button</Button>
        </nav>
        <div slot="center">
            {@html logo}
        </div>
        <nav slot="right">
            <Modal bind:open size="lg" height="80vh">
                <Button on:click={e => open = true} variant="primary">
                    JSON
                </Button>
                <div slot="content">
                    <Result />
                </div>
            </Modal>
            <Button href="#" shape="circle">
                <Icon icon="icon-people" />
            </Button>
        </nav>
    </Navbar>
</div>

<script lang="ts">
    import Navbar from '@/layouts/Navbar.svelte';
    import Modal from '@/layouts/Modal.svelte';
    import Button from '@/components/Button';
    import Icon from '@/components/Icon';
    import Result from '@/views/Result.svelte';

    import logo from '@/assets/logo.svg';

    let open = false;
</script>

<style lang="scss">
    [slot='center'] > :global(svg) {
        width: 55px;
    }
</style>
