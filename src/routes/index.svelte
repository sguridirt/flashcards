<script lang="ts">
  import InputDisplay from "../components/InputDisplay.svelte";
  import Card from "../components/Card.svelte";

  export let deckName = "Duolingo word review";
</script>

<svelte:head>
  <title>flashcards!</title>
</svelte:head>

<main class="flex flex-col items-center max-w-2xl p-8 gap-5 my-0 mx-auto">
  <h2 class="self-start uppercase text-sm text-gray-800">{deckName}</h2>
  <Card />
  <InputDisplay />
</main>
