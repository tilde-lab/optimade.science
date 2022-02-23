<div>
    <Select {...$$restProps} {items} bind:selectedValue />
</div>

<script lang="ts" context="module">
    import Select from 'svelte-select';
</script>

<script lang="ts">
    export let items: [] = [];
    export let selectedValue;
</script>

<style lang="scss">
    div {
        display: contents;
        --border: 0.05rem solid #bcc3ce;
        --borderRadius: 0.1rem;
        --height: 1.8rem;
        --padding: 5px 8px;
        --inputFontSize: 0.8rem;
        --inputColor: #3b4351;
        --placeholderColor: #bcc3ce;
        --indicatorTop: 8px;
        --clearSelectTop: 8px;
        --listBackground: #f1f1fc;
    }
    @media (prefers-color-scheme: dark) {
        div {
            --background: #252b33;
            --inputColor: #f2f2f2;
            --listBackground: #343a51;
        }
    }
    :global([color-scheme='dark']) {
        div {
            --background: #252b33;
            --inputColor: #f2f2f2;
            --listBackground: #343a51;
        }
    }
    :global([color-scheme='light']) {
        div {
            --background: #fff;
            --inputColor: #3b4351;
            --listBackground: #f1f1fc;
        }
    }
</style>
