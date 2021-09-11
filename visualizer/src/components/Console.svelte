<script lang="ts">
  import { console } from '../stores';
  import { afterUpdate } from 'svelte';
  let container: HTMLElement;

  afterUpdate(() => {
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  });
</script>

<style>
  div {
    margin-top: 16px;
    width: 100%;
    height: 150px;
    overflow-y: scroll;
    background: #eeeeee;
  }
  ul {
    list-style: none;
    padding: 0 24px;
    text-align: left;
  }
  li {
    border-bottom: 1px solid #999999;
  }
</style>

<div bind:this="{container}">
  <ul>
    {#each $console as item}
      <li>{item}</li>
    {/each}
  </ul>
</div>
