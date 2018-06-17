const router = require('express').Router()
const {User, Beat} = require('../db/models')
module.exports = router

//Get all users
router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

//Get all users songs
router.get('/:userId/songs', (req, res, next) => {
  let userId = req.params.userId //change to req.user.id

  User.findAllSongs(userId)
  .then(foundSongs => res.json(foundSongs))
  .catch(next)
})

//Get users song by id
router.get('/:userId/songs/:songId', (req, res, next) => {
  let userId = req.params.userId //change to req.user.id
  let songId = req.params.songId
  
  User.findSongById(userId, songId)
  .then(foundSongs => res.json(foundSongs))
  .catch(next)
})

//Api for routes
router.put('/lyric/:beatId', (req, res, next) => {
  let beatId = req.params.beatId
  console.log('**********', req.body)
  let lyric = req.body.lyric

  Beat.findById(beatId)
  .then(foundBeat => {
    return foundBeat.update({
      lyric
    })
  })
  .then(updatedBeat => {
    res.json(updatedBeat.dataValues)
  })
  .catch(next)
})
