import axios from "axios"
import fs from "fs"
import utf8 from "utf8"

function capitalize(word) {
  const lower = word.toLowerCase()
  return lower.charAt(0).toUpperCase() + lower.slice(1)
}

async function updateVocab(vocab) {
  let translatedVocab = { ...vocab }

  for (let i in translatedVocab.vocabulary) {
    const wordObject = translatedVocab.vocabulary[i]

    if (wordObject.pos === "Proper noun") continue
    if (!wordObject.pos) continue // sentences

    const word =
      wordObject.pos === "Noun"
        ? capitalize(wordObject.word_string)
        : wordObject.word_string
    try {
      console.log("Word in german:", word)

      const res = await axios.get(
        "https://d2.duolingo.com/api/1/dictionary/hints/de/en?token=" +
          utf8.encode(word)
      )

      const translations = res.data
      translatedVocab.vocabulary[i].translations = translations
    } catch (err) {
      console.log(err)
    }
  }
  return translatedVocab
}

const vocab = JSON.parse(fs.readFileSync("./my-vocabulary-processed2.json"))
updateVocab(vocab).then((data) => {
  let processedDataString = JSON.stringify(data)
  fs.writeFileSync("./my-vocabulary-processed3.json", processedDataString)
})
