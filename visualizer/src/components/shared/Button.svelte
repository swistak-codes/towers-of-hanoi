<script lang="ts">
  export let disabled = false;
</script>

<style>
  button {
    background: #ff3e00;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 2px;
    cursor: pointer;
  }
  button:disabled {
    background: gray;
    cursor: not-allowed;
  }
</style>

<button on:click disabled="{disabled}">
  <slot />
</button>
