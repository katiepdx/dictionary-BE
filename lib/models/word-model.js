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

  // GET a word by id
  static async getWordById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM words
      WHERE id=$1`, [id]
    )

    return new Word(rows[0])
  }

  // PUT update a word by id
  static async updateWordById(id, updatedWord) {
    const { rows } = await pool.query(
      `UPDATE words
        SET word=$1, 
        word_language=$2, 
        word_translation=$3, 
        word_definition=$4, 
        example_sentence=$5, 
        notes=$6
        WHERE id=$7
        RETURNING *`, [updatedWord.word, updatedWord.wordLanguage, updatedWord.wordTranslation, updatedWord.wordDefinition, updatedWord.exampleSentence, updatedWord.notes, id]
    )
    
    return new Word(rows[0])
  }
}
