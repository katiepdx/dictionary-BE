// data helps for seed
require('../lib/data/data-helpers')
const request = require('supertest');
const app = require('../lib/app');
const Word = require('../lib/models/word-model')

describe('dictionary-BE routes', () => {

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
    // GET request to endpoint
    await request(app)
      .get('/api/v1/words')
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining([{
          id: expect.any(String),
          word: expect.any(String),
          wordLanguage: expect.any(String),
          wordTranslation: expect.any(String),
          wordDefinition: expect.any(String),
          exampleSentence: expect.any(String),
          notes: expect.any(String)
        }]))
      })
  })

  it('should get a word by id from the database using GET', async () => {
    // GET by id request to endpoint
    await request(app)
      .get('/api/v1/words/1')
      .then(res => {
        expect(res.body).toEqual({
          id: '1',
          word: expect.any(String),
          wordLanguage: expect.any(String),
          wordTranslation: expect.any(String),
          wordDefinition: expect.any(String),
          exampleSentence: expect.any(String),
          notes: expect.any(String)
        })
      })
  })

  it('should update a word by id from the database using PUT', async () => {
    await request(app)
      .put('/api/v1/words/1')
      .send({
          word: 'UPDATED WORD 1',
          wordLanguage: 'UPDATED WORD 1',
          wordTranslation: 'UPDATED WORD 1',
          wordDefinition: 'UPDATED WORD 1',
          exampleSentence: 'UPDATED WORD 1',
          notes: 'UPDATED WORD 1'
        })
      .then(res => {
        expect(res.body).toEqual({
          id: '1',
          word: 'UPDATED WORD 1',
          wordLanguage: 'UPDATED WORD 1',
          wordTranslation: 'UPDATED WORD 1',
          wordDefinition: 'UPDATED WORD 1',
          exampleSentence: 'UPDATED WORD 1',
          notes: 'UPDATED WORD 1'
        })
      })
  })
});
