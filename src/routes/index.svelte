<script lang="ts">
  import AnswerForm from "../components/AnswerForm.svelte";
  import Card from "../components/Card.svelte";

  let started = false;

  let deckName: string = "Duolingo word review";

  let inputStr = "";
</script>

<svelte:head>
  <title>flashcards!</title>
</svelte:head>

<main class="flex flex-col items-center max-w-2xl p-8 gap-5 my-0 mx-auto">
  <h2 class="self-start uppercase text-sm text-gray-700">{deckName}</h2>
  <Card />
  {#if started}
    <AnswerForm />
    <p class="text-gray-700 italic">
      (Press <kbd class="tracking-normal">enter</kbd> to continue)
    </p>
  {:else}
    <button class="p-3 w-full font-bold text-white bg-black rounded-sm uppercase"
      >START</button
    >
  {/if}
</main>
