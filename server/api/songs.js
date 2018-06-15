const router = require('express').Router()
const {Song} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Song.findAll()
  .then(songs => res.json(songs))
  .catch(next)
})
