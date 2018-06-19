const router = require('express').Router()
const {User, Beat, Song} = require('../db/models')
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

//Route to create Song for user
router.post('/:userId/song', (req, res, next) => {
  let userId = req.params.userId
  let order = req.body.lastSongOrder
  let title = req.body.title
  let description = req.body.description
  let tags = req.body.tags

  return Song.create({
    userId,
    order,
    description,
    tags,
    title
  })
  .then(createdSong => {
    res.json(createdSong.dataValues)
  })
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
  let lyric = req.body.lyrics

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

//Api for creating sections
router.post('/section', (req, res, next) => {
  let songId = req.body.songId
  let order = req.body.lastSectionOrder
  let name = req.body.name

  User.createSection(songId, order, name)
  .then(() => {
    res.sendStatus(200)
  })
  .catch(next)
})

//Api for creating bars
router.post('/bar', (req, res, next) => {
  let sectionId = req.body.sectionId
  let order = req.body.lastBarOrder

  User.createBar(sectionId, order)
  .then(() => {
    res.sendStatus(200)
  })
  .catch(next)
})