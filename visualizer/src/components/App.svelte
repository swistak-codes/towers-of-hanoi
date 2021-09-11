<script lang="ts">
  import type { Algorithm } from '../types';
  import Parameters from './Parameters.svelte';
  import Controls from './Controls.svelte';
  import Display from './Display.svelte';
  import Console from './Console.svelte';

  export let algorithm: Algorithm;
</script>

<style>
  main {
    font-family: sans-serif;
    text-align: center;
  }
</style>

<main>
  <h1>Wieże Hanoi</h1>
  <h2>{algorithm.name}</h2>
  <Parameters />
  <Display />
  <Controls algorithm="{algorithm}" />
  <Console />
</main>
