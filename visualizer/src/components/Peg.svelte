<script lang="ts">
  import type { Disc } from '../types';

  export let discs: Disc[];
  export let name: string;
</script>

<style lang="scss">
  $base-color: red;
  $active-color: green;
  $peg-color: lighten(#a85751, 10%);
  $disc-height: 20px;

  @mixin disc-coloring($color) {
    background: $color;
    -webkit-box-shadow: inset 0px 0px 15px 5px darken($color, 20%);
    box-shadow: inset 0px 0px 15px 5px darken($color, 20%);
    border: 1px solid darken($color, 25%);
  }

  .disc {
    @include disc-coloring($base-color);
    height: $disc-height;
    border-radius: 20px;
    margin-top: 2px;

    &--active {
      @include disc-coloring($active-color);
    }

    @for $i from 1 through 10 {
      &--#{$i} {
        width: percentage((20 + 6 * $i) / 100);
      }
    }
  }

  .peg {
    height: $disc-height * 10;
    flex: 1 0;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    background: linear-gradient(
      to left,
      transparentize($peg-color, 1),
      transparentize($peg-color, 1) 47%,
      darken($peg-color, 5%) 47%,
      $peg-color 50%,
      darken($peg-color, 5%) 53%,
      transparentize($peg-color, 1) 53%,
      transparentize($peg-color, 1)
    );
  }

  .peg-container {
    flex: 1 0;
    margin: 1em !important;
    height: calc(#{$disc-height * 10} + 1em + 20px);
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .label {
    flex: 0 1;
    height: 100%;
    width: 100%;
    padding: 8px 0;
    color: white;
    background: linear-gradient(
      to left,
      darken($peg-color, 15%) 0%,
      $peg-color 15%,
      $peg-color 85%,
      darken($peg-color, 15%) 100%
    );
  }
</style>

<div class="peg-container">
  <div class="peg">
    {#each discs as disc (disc.value)}
      <div
        class="disc disc--{disc.value}"
        class:disc--active="{disc.isActive}"
      ></div>
    {/each}
  </div>
  <div class="label">
    {name}
  </div>
</div>
