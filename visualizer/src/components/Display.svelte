<script lang="ts">
  import Container from './shared/Container.svelte';
  import Peg from './Peg.svelte';
  import { pegA, pegB, pegC, movesCount } from '../stores';
</script>

<Container>
  <Peg discs="{$pegA}" name="A (startowy)" />
  <Peg discs="{$pegB}" name="B (pomocniczy)" />
  <Peg discs="{$pegC}" name="C (docelowy)" />
</Container>
<p>Liczba wykonanych ruchów: {$movesCount}</p>
