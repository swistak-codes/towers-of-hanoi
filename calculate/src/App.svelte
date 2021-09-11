<script lang="ts">
  import { mod } from './mod';

  let n = 3;
  let i = 0;
  let j = 2;
  let results: number[][] = [];
  $: maxMoves = 2 ** n - 1;

  const calculate = () => {
    results = [];
    for (let l = 0; l <= maxMoves; l++) {
      const currentArray = [];
      for (let d = 1; d <= n; d++) {
        const k = Math.trunc(l / 2 ** d + 0.5);
        const s = mod(k * (j - i) * (mod(n - d, 2) + 1) + i, 3);
        currentArray.push(s);
      }
      results.push(currentArray);
    }
  };
</script>

<style lang="scss">
  main {
    font-family: sans-serif;
    text-align: center;
  }

  .container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    &__item {
      display: flex;
      flex-direction: column;
      margin-right: 16px;
    }
  }

  label {
    display: block;
  }

  input {
    display: block;
    width: 75px;
    margin: auto;
  }

  button {
    background: #ff3e00;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 2px;
    cursor: pointer;

    &:disabled {
      background: gray;
      cursor: not-allowed;
    }
  }

  table {
    margin-top: 16px;
    border-collapse: collapse;
  }

  table,
  th,
  td {
    border: 1px solid black;
  }

  th,
  td {
    width: 2em;
    height: 2em;
  }
</style>

<main>
  <h1>Położenie krążków</h1>
  <div class="container">
    <div class="container__item">
      <label for="discs">Liczba krążków:</label>
      <input id="discs" type="number" min="1" max="10" bind:value="{n}" />
    </div>
    <div class="container__item">
      <label for="start">Słupek startowy:</label>
      <input id="start" type="number" min="0" max="2" bind:value="{i}" />
    </div>
    <div class="container__item">
      <label for="final">Słupek docelowy:</label>
      <input id="final" type="number" min="0" max="2" bind:value="{j}" />
    </div>
    <button on:click="{calculate}">Oblicz</button>
  </div>
  {#if results.length > 0}
    <div class="container">
      <table>
        <thead>
          <th>l \ d</th>
          {#each results[0] as _, i}
            <th scope="col">{i + 1}</th>
          {/each}
        </thead>
        <tbody>
          {#each results as move, i}
            <tr>
              <th scope="row">{i}</th>
              {#each move as disc}
                <td>{disc}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</main>
