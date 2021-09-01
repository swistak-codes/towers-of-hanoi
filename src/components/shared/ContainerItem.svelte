<style>
  .item {
    display: flex;
    flex-direction: column;
  }
  .item > :global(label) {
    display: block;
  }
  .item > :global(input) {
    display: block;
    width: 75px;
    margin: auto;
  }
</style>

<div class="item">
  <slot />
</div>
