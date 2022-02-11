var deck = []
deck = createDeck(15)

var session = {
  currentState: "unstarted",
  index: 0,
  grades: {
    correct: [],
    wrong: [],
  },
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementsByClassName("answer-form")[0]
  form.addEventListener("submit", (event) => {
    event.preventDefault()
    process(event)
  })
})

function sample(arr, n) {
  let result = new Array(n),
    len = arr.length,
    taken = new Array(len)
  if (n > len)
    throw new RangeError("sample: more elements taken than available")
  while (n--) {
    const x = Math.floor(Math.random() * len)
    result[n] = arr[x in taken ? taken[x] : x]
    taken[x] = --len in taken ? taken[len] : len
  }
  return result
}

function createDeck(length) {
  const wordObjects = sample(vocab.vocabulary, length)
  const words = wordObjects.map((wo) => {
    return {
      german: wo.word_string,
      pos: wo.pos,
      english: wo.translations,
    }
  })
  return words
}

function nextCard(cardData) {
  let prompt = cardData.german
  let answer = cardData.english

  if (cardData.pos === "Noun") {
    prompt = prompt.charAt(0).toUpperCase() + prompt.slice(1)
  }

  fillCard(prompt, answer)
}

function fillCard(prompt, answer) {
  let cardPrompt = document.querySelector(".card__prompt")
  let cardAnswer = document.querySelector(".card__answer")

  cardPrompt.textContent = prompt
  cardAnswer.textContent = answer
}

function flipCard() {
  let card = document.querySelector(".card")
  card.classList.toggle("is-flipped")
}

function checkAnswer(answer) {
  let formattedAnswer = answer.toLowerCase().trim()
  return deck[session.index].english.includes(formattedAnswer)
}

function showStats() {
  const stats = document.querySelector(".stats")
  const wrongList = document.querySelector(".stats ul")

  if (session.grades.wrong.length === 0) return

  session.grades.wrong.forEach((word) => {
    let li = document.createElement("li")
    li.appendChild(
      document.createTextNode(`"${word.german}" → ${word.english.slice(0, 3)}`)
    )
    wrongList.appendChild(li)
  })

  stats.style.display = "flex"
}

function process(event) {
  const inputContainer = document.querySelector(".input-wrapper")
  const input = event.target.elements.answerInput
  const label = event.target.elements.answerInput.labels[0]
  const button = event.target.elements.actionButton

  switch (session.currentState) {
    case "unstarted":
      console.log(deck[session.index].german, deck[session.index].english)
      nextCard(deck[session.index])

      button.textContent = "Check"
      inputContainer.style.display = "block"

      session.currentState = "answering"
      break

    case "answering":
      const answer = input.value
      if (answer) {
        button.textContent = "Next"
        flipCard()
        const isCorrect = checkAnswer(answer)
        if (isCorrect) {
          label.textContent = "Correct! ✅"
          session.grades.correct.push({
            german: deck[session.index].german,
            english: deck[session.index].english,
          })
        } else {
          label.textContent = "Wrong! ❌"
          session.grades.wrong.push({
            german: deck[session.index].german,
            english: deck[session.index].english,
          })
        }
        // input.readOnly = true
        // input.disabled = true // this also disables the ability to advance with the 'Enter' key after checking
        console.log(deck[session.index].german, deck[session.index].english)

        if (session.index === deck.length - 1) {
          console.log("Finished!")
          button.textContent = "Finished!"
          button.disabled = true
          input.disabled = true
          showStats()
          return
        }
      }

      session.currentState = "revising"
      break

    case "revising":
      session.index += 1
      button.textContent = "Check"
      input.value = ""
      // input.disabled = false
      label.textContent = "Type your answer 👇"
      console.log(deck[session.index].german, deck[session.index].english)
      flipCard()
      nextCard(deck[session.index])

      session.currentState = "answering"
      break

    case "finished":
      break
  }
}
