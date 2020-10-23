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
            <Button href="#" variant="primary">Colored</Button>
            <Button href="#" shape="circle">
                <Icon icon="icon-people" />
            </Button>
        </nav>
    </Navbar>
</div>

<script lang="ts">
    import Navbar from '@/layouts/Navbar.svelte';
    import Button from '@/components/Button';
    import Icon from '@/components/Icon';

    import logo from '@/assets/logo.svg';
</script>

<style lang="scss">
    [slot='center'] > :global(svg) {
        width: 55px;
    }
</style>
