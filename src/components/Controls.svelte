<script lang="ts">
  import type {
    Algorithm,
    AlgorithmGenerator,
    AlgorithmReturnType,
  } from '../types';
  import Container from './shared/Container.svelte';
  import Button from './shared/Button.svelte';
  import ContainerItem from './shared/ContainerItem.svelte';
  import {
    canExecuteIteration,
    console,
    isFreshData,
    isIterationFinished,
    movesCount,
    pegA,
    pegB,
    pegC,
  } from '../stores';
  import { executeAnimated, stopAnimation } from '../helpers/executeAnimated';
  import { executeWhole } from '../helpers/executeWhole';

  export let algorithm: Algorithm;
  let fps = 30;
  let iterator: AlgorithmGenerator;
  let isAnimating = false;

  /**
   * Funkcja uruchamiająca na nowo algorytm
   */
  const startIteration = () => {
    // pobieramy iterator z funkcji
    iterator = algorithm.doWork($pegA); // TODO przekazac dane
    // ustawiamy, że dane nie są "świeże"
    $isFreshData = false;
  };

  /**
   * Funkcja aktualizująca dane w stanie aplikacji
   */
  const updateData = (data: AlgorithmReturnType) => {
    $pegA = data.pegA;
    $pegB = data.pegB;
    $pegC = data.pegC;
    $movesCount = data.moveCount;
    $console = data.consoleOutput;
  };

  /**
   * Funkcja przewijająca algorytm do samego końca
   */
  const fastForward = () => {
    // jezeli algorytm nie został uruchomiony, zróbmy to
    if ($isFreshData) {
      startIteration();
    }
    // wykorzystujemy funkcję pomocniczą uruchamiająca algorytm do samego końca
    // przekazujemy tez funkcję aktualizującą dane
    executeWhole(iterator, updateData);
    // określamy koniec algorytmu
    $isIterationFinished = true;
  };

  /**
   * Funkcja odtwarzająca animację algorytmu
   */
  const animate = async () => {
    // jezeli algorytm nie został uruchomiony, zróbmy to
    if ($isFreshData) {
      startIteration();
    }
    // oznaczmy ze zaczęliśmy odtwarzanie
    isAnimating = true;
    // wykorzystujemy funkcję pomocniczą uruchamiająca algorytm do samego końca z animacją
    // prędkość animacji będzie nam wyznaczać ile klatek animacji wyświetli się na sekundę, stąd dzielimy 1000 przez tą wartość
    // przekazujemy tez funkcję aktualizującą dane
    await executeAnimated(iterator, Math.round(1000 / fps), updateData);
    if (isAnimating) {
      // określamy koniec algorytmu, jezeli animacja była odtwarzana
      $isIterationFinished = true;
      // określamy koniec animacji
      isAnimating = false;
    }
  };

  /**
   * Funkcja przerywająca animację
   */
  function stopPlaying() {
    stopAnimation();
    isAnimating = false;
  }
  /**
   * Funkcja przechodząca do następnego kroku
   */
  function goToNext() {
    // jeżeli algorytm nie został uruchomiony, zróbmy to
    if ($isFreshData) {
      startIteration();
    }
    // pobieramy kolejną wartość z iteratora
    const result = iterator.next();
    // aktualizujemy rysunek
    updateData(result.value);
    if (result.done) {
      // jeżeli otrzymaliśmy informację o końcu algorytmu, oznaczamy go
      $isIterationFinished = true;
    }
  }
</script>

<Container>
  <Button
    disabled="{!$canExecuteIteration || isAnimating}"
    on:click="{goToNext}"
  >
    Następny krok
  </Button>
  <ContainerItem>
    <label for="fps">Prędkość animacji</label>
    <input
      id="fps"
      name="elements"
      type="number"
      min="1"
      max="60"
      bind:value="{fps}"
      disabled="{!$canExecuteIteration || isAnimating}"
    />
  </ContainerItem>
  {#if !isAnimating}
    <Button disabled="{!$canExecuteIteration}" on:click="{animate}"
      >Odtwórz animację</Button
    >
  {:else}
    <Button disabled="{!$canExecuteIteration}" on:click="{stopPlaying}">
      Pauza
    </Button>
  {/if}
  <Button
    disabled="{!$canExecuteIteration || isAnimating}"
    on:click="{fastForward}"
  >
    Przewiń do końca
  </Button>
</Container>
