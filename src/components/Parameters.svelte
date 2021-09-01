<script lang="ts">
  import Container from './shared/Container.svelte';
  import ContainerItem from './shared/ContainerItem.svelte';
  import {
    isFreshData,
    isIterationFinished,
    pegA,
    pegB,
    pegC,
    console,
  } from '../stores';
  import Button from './shared/Button.svelte';

  let discs = 3;

  const start = () => {
    $pegA = Array.from({ length: discs }, (_, i) => ({
      value: discs - i,
      isActive: false,
    }));
    $pegB = [];
    $pegC = [];
    $isIterationFinished = false;
    $isFreshData = true;
    $console = [];
  };
</script>

<Container>
  <ContainerItem>
    <label for="discs">Liczba krążków:</label>
    <input
      name="discs"
      id="discs"
      type="number"
      min="1"
      max="10"
      bind:value="{discs}"
    />
  </ContainerItem>
  <Button on:click="{start}">Start</Button>
</Container>
