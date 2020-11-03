<div>
  <Select {...$$restProps} {items} bind:selectedValue></Select>
</div>

<script lang="ts">
  import Select from 'svelte-select';

  export let items: [] = [];
  export let selectedValue;
</script>

<style>
   div {
    --border: 0.05rem solid #bcc3ce;
    --borderRadius: 0.1rem;
    --height: 1.8rem;
    --padding: 5px 8px;
    --inputFontSize: 0.8rem;
    --inputColor: #3b4351;
    --placeholderColor: #bcc3ce;
  }
</style>