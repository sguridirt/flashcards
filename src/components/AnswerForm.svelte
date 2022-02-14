<script lang="ts">
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  import { shouldCleanForm } from "../stores/formStore";

  const dispatch = createEventDispatcher();

  export let prompt: string;

  let inputValue: string = "";

  function handleSubmit() {
    if (inputValue.length !== 0) {
      dispatch("submit", {
        text: inputValue,
      });
    }
  }

  $: {
    if ($shouldCleanForm) inputValue = "";
  }
</script>

<form
  class="mb-2 w-full rounded-sm border border-black p-4"
  on:submit|preventDefault={handleSubmit}
  in:fly={{ x: -200, duration: 600 }}
>
  <p class="mb-2 text-sm text-gray-700">{prompt}</p>
  <input
    type="text"
    placeholder="answer..."
    class="h-12 w-full border-b-2 border-black focus:outline-none"
    bind:value={inputValue}
  />
</form>
