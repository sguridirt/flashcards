<script lang="ts">
  let flipped: boolean = false;

  function flipCard() {
    flipped = !flipped;
  }
</script>

<div class="relative w-full h-28 rounded-sm bg-white flippable" class:flipped on:click={flipCard}>
  <div class="absolute flex items-center justify-center p-4 w-full h-full front">
    <p class="font-bold text-2xl tracking-wide">Front</p>
  </div>
  <div class="absolute flex items-center justify-center p-4 w-full h-full back">
    <p>Back</p>
  </div>
</div>

<style>
  .flippable {
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
    transition: transform 0.2s;

    box-shadow: 2px 2px 4px 3px rgb(235, 235, 235); /* TODO: Try to fix this workaround */
  }

  .flippable.flipped {
    -webkit-transform: rotateX(-180deg);
    transform: rotateX(-180deg);

    box-shadow: 2px -2px 4px 3px rgb(235, 235, 235); /* TODO: Try to fix this workaround */
  }

  .front,
  .back {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .back {
    -webkit-transform: rotateX(-180deg);
    transform: rotateX(-180deg);
    will-change: transform;
  }
</style>
