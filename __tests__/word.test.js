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
});
