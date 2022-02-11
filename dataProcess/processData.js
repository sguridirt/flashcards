const fs = require("fs")

let rawData = fs.readFileSync("./my-vocabulary.json")
let data = JSON.parse(rawData)

let processedData = {}
processedData.learning_language = data.learning_language
processedData.from_language = data.from_language
processedData.vocabulary = []

for (const word of data.vocab_overview) {
  let processedWord = {}
  processedWord.normalized_string = word.normalized_string
  processedWord.word_string = word.word_string
  processedWord.pos = word.pos
  processedWord.gender = word.gender
  processedWord.dl_strength = word.strength
  processedWord.dl_lexeme_id = word.lexeme_id
  processedData.vocabulary.push(processedWord)
}

let processedDataString = JSON.stringify(processedData)
fs.writeFileSync("./my-vocabulary-processed.json", processedDataString)
