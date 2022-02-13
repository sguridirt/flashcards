<script lang="ts">
  function handleSubmit(event) {}
</script>

<form
  class="w-full mb-2 p-4 border border-black rounded-sm"
  on:submit|preventDefault={handleSubmit}
>
  <p class="mb-2 text-sm text-gray-700">Type your answer 👇</p>
  <input
    type="text"
    placeholder="answer..."
    class="w-full h-12 border-b-2 border-black focus:outline-none"
  />
</form>
