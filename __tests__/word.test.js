const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Word = require('../lib/models/word-model')

describe('dictionary-BE routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'))
  });

  it('should add a word to the database table using POST', async () => {
    return await request(app)
      .post('/api/v1/words')
      .send({
        word: '开心',
        wordLanguage: 'Chinese',
        wordTranslation: 'Happy',
        wordDefinition: 'feeling or showing pleasure or contentment.',
        exampleSentence: '我非常开心！',
        notes: 'I learned a new word!'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          word: '开心',
          wordLanguage: 'Chinese',
          wordTranslation: 'Happy',
          wordDefinition: 'feeling or showing pleasure or contentment.',
          exampleSentence: '我非常开心！',
          notes: 'I learned a new word!'
        })
      })
  })

  it('should get all words in database using GET', async () => {
    await Promise.all([
      Word.createWord(
        ({
          word: 'Word1',
          wordLanguage: 'English',
          wordTranslation: 'Word1',
          wordDefinition: 'word1 definition.',
          exampleSentence: 'This is word1！',
          notes: 'I learned a new word!'
        }),
        Word.createWord({
          word: 'Word2',
          wordLanguage: 'English',
          wordTranslation: 'Word2',
          wordDefinition: 'word2 definition.',
          exampleSentence: 'This is word2！',
          notes: 'I learned a new word!'
        })
      )
    ])

    // GET request to endpoint
    await request(app)
      .get('/api/v1/words')
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining([
          {
            id: expect.any(String),
            word: 'Word1',
            wordLanguage: 'English',
            wordTranslation: 'Word1',
            wordDefinition: 'word1 definition.',
            exampleSentence: 'This is word1！',
            notes: 'I learned a new word!'
          }, {
            id: expect.any(String),
            word: 'Word2',
            wordLanguage: 'English',
            wordTranslation: 'Word2',
            wordDefinition: 'word2 definition.',
            exampleSentence: 'This is word2！',
            notes: 'I learned a new word!'
          }
        ]))
      })
  })
});
