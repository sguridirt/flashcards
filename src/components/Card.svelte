<script lang="ts">
  import { SessionState } from "../models";

  import { session } from "../stores/sessionStore";

  export let front: string;
  export let back: string[];

  let flipped: boolean = false;

  $: {
    flipped = $session.state === SessionState.Revising;
  }
</script>

<div class="flippable relative mb-2 h-28 w-full rounded-sm" class:flipped>
  <div class="front absolute flex h-full w-full items-center justify-center p-4">
    <p class="text-2xl font-bold tracking-wide">{front}</p>
  </div>
  <div
    class="back absolute flex h-full w-full flex-col flex-wrap items-center justify-center p-4"
  >
    {#each back as possibleAnswer}
      <p class="text-lg">{possibleAnswer}</p>
    {/each}
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
