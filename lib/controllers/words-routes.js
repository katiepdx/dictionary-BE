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
