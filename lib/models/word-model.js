// createWord, getAllWords, getWordById, updateWordById, deleteWordById

const pool = require('../utils/pool')

module.exports = class Word {
  id;
  word;
  wordLanguage;
  wordTranslation;
  wordDefinition;
  exampleSentence;
  notes;

  constructor(word) {
    this.id = word.id;
    this.word = word.word;
    this.wordLanguage = word.word_language;
    this.wordTranslation = word.word_translation;
    this.wordDefinition = word.word_definition;
    this.exampleSentence = word.example_sentence;
    this.notes = word.notes;
  }

  // CREATE/POST
  static async createWord(word) {
    const { rows } = await pool.query(
      `INSERT INTO words
      (word, word_language, word_translation, word_definition, example_sentence, notes)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [word.word, word.wordLanguage, word.wordTranslation, word.wordDefinition, word.exampleSentence, word.notes]
    )

    return new Word(rows[0]);
  }

  // GET all words
  static async getAllWords() {
    const { rows } = await pool.query(
      `SELECT * FROM words`
    )

    return rows.map((row) => (new Word(row)))
  }
}
