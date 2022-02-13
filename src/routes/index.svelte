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

<main class="my-0 mx-auto flex max-w-2xl flex-col items-center gap-5 p-8">
  <h2 class="self-start text-sm uppercase text-gray-700">{deckName}</h2>
  <Card />
  {#if started}
    <AnswerForm />
    <p class="italic text-gray-700">
      (Press <kbd class="tracking-normal">enter</kbd> to continue)
    </p>
  {:else}
    <button class="p-3 w-full font-bold text-white bg-black rounded-sm uppercase"
      >START</button
    >
  {/if}
</main>
