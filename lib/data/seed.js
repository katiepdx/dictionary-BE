const Word = require("../models/word-model")

module.exports = async ({ wordsCount = 15 } = {}) => {
  const wordsToCreate = [...Array(wordsCount)]
    .map((_, index) => ({
      word: `Word ${index + 1}`,
      wordLanguage: 'English',
      wordTranslation: `Word translation ${index + 1}`,
      wordDefinition: `Word definition ${index + 1}`,
      exampleSentence: `This is word ${index + 1}！`,
      notes: 'I learned a new word!'
    }))

  // POST to database 
  await Promise.all(wordsToCreate.map(word => (Word.createWord(word))))
}
