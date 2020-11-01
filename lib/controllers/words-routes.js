const { Router } = require('express')
const Word = require('../models/word-model')

module.exports = Router()
  // POST route
  .post('/', (req, res, next) => {
    // use Word model
    Word
      .createWord(req.body)
      .then(word => res.send(word))
      .catch(next)
  })

  // GET route
  .get('/', (req, res, next) => {
    Word
      .getAllWords(req.body)
      .then(allWords => res.send(allWords))
      .catch(next)
  })

  // GET by id route 
  .get('/:id', (req, res, next) => {
    Word
      .getWordById(req.params.id)
      .then(word => res.send(word))
      .catch(next)
  })

  // PUT update by id route 
  .put('/:id', (req, res, next) => {
    Word
      .updateWordById(req.params.id, req.body)
      .then(word => res.send(word))
      .catch(next)
  })

  // DELETE delete by id route 
  .delete('/:id', (req, res, next) => {
    Word
      .deleteWordById(req.params.id)
      .then(word => res.send(word))
      .catch(next)
  })
