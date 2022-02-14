<script lang="ts">
  import AnswerForm from "../components/AnswerForm.svelte";
  import Card from "../components/Card.svelte";

  import { SessionState } from "../models";
  import { sample } from "../utils";
  import { vocab } from "../data";

  import { session } from "../stores/sessionStore";
  import { shouldCleanForm } from "../stores/formStore";

  const DECK_NAME: string = "Duolingo word review";
  const DECK_LENGTH: number = 2;
  const deck = createDeck(vocab.vocabulary, DECK_LENGTH);

  let formPrompt: string = "Type your answer 👇";

  let cardPrompt: string = "Ready?";
  let cardAnswer: string[] = [""];

  function startSession() {
    $session.state = SessionState.Answering;
    fillCard();
  }

  function processSubmit(event) {
    console.log(`before action: ${$session.state} ${$session.index}`);
    switch ($session.state) {
      case SessionState.Answering:
        $shouldCleanForm = false;
        let isCorrect = isCorrectAnswer(event.detail.text);
        if (isCorrect) {
          formPrompt = "Correct! ✅";
          $session.grades.correct = [
            ...$session.grades.correct,
            {
              german: deck[$session.index].german,
              english: deck[$session.index].english,
            },
          ];
        } else {
          formPrompt = "Wrong! ❌";
          $session.grades.wrong = [
            ...$session.grades.wrong,
            {
              german: deck[$session.index].german,
              english: deck[$session.index].english,
            },
          ];
        }

        // Card automatically flips on state change
        $session.state = SessionState.Revising;
        break;
      case SessionState.Revising:
        if ($session.index === deck.length - 1) {
          $session.state = SessionState.Finished;
          cardPrompt = "Finished!";
          formPrompt = "Well done!";
          // button.disabled = true;
          $shouldCleanForm = true;
          // showStats();
          return;
        }

        // Next
        $session.index += 1;
        fillCard();
        formPrompt = "Type your answer 👇";
        $shouldCleanForm = true;
        $session.state = SessionState.Answering;
        break;
    }
  }

  function isCorrectAnswer(text: string): boolean {
    let formattedAnswer = text.toLowerCase().trim();

    return deck[$session.index].english.includes(formattedAnswer);
  }

  function fillCard() {
    let prompt = deck[$session.index].german;

    if (deck[$session.index].pos === "Noun") {
      prompt = prompt.charAt(0).toUpperCase() + prompt.slice(1);
    }

    cardPrompt = prompt;
    cardAnswer = deck[$session.index].english;
    console.log({ cardPrompt, cardAnswer });
  }

  export function createDeck(arr, length) {
    const wordObjects = sample(arr, length);
    const words = wordObjects.map((wo) => {
      return {
        german: wo.word_string,
        pos: wo.pos,
        english: wo.translations,
      };
    });
    return words;
  }
</script>

<svelte:head>
  <title>flashcards!</title>
</svelte:head>

<main class="my-0 mx-auto flex max-w-2xl flex-col items-center gap-5 p-8">
  <h2 class="self-start text-sm uppercase text-gray-700">{DECK_NAME}</h2>
  <Card front={cardPrompt} back={cardAnswer} />
  {#if $session.state === SessionState.Answering || $session.state === SessionState.Revising}
    <AnswerForm prompt={formPrompt} on:submit={processSubmit} />
    <p class="italic text-gray-700">
      (Press <kbd class="tracking-normal">enter</kbd> to continue)
    </p>
  {:else if $session.state === SessionState.Unstarted}
    <button
      class="w-full bg-black hover:bg-gray-700 text-lg text-white font-semibold p-3 rounded-sm shadow-md"
      on:click={startSession}
    >
      START
    </button>
  {:else if $session.state === SessionState.Finished}
    {#if $session.grades.wrong.length !== 0}
      <h3 class="self-start font-bold">Wrong words</h3>
      <ul class="self-start list-disc list-inside">
        {#each $session.grades.wrong as word}
          <li>
            <span class="italic capitalize">{word.german}</span> → {word.english
              .slice(0, 3)
              .join(" ")}
          </li>
        {/each}
      </ul>
    {:else}
      <p>You had a perfect session! 🤩</p>
    {/if}
  {/if}
</main>
