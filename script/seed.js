'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Song} = require('../server/db/models')
const {Section} = require('../server/db/models')
const {Bar} = require('../server/db/models')
const {Beat} = require('../server/db/models')

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'admin@email.com', isAdmin: true, password: '123'})
  ])
  const songs = await Promise.all([
    Song.create({order: 1, title: 'Ocean Waves', description: 'My first song', tags: ['first song', 'hiphop'], userId: 3}),
    Song.create({order: 2, title: 'Lavish Living', description: 'My second song', tags: ['second song', 'hiphop'], userId: 3}),
    Song.create({order: 3, title: 'Mile Stones', description: 'My third song', tags: ['third song', 'hiphop'], userId: 3}),
    Song.create({order: 4, title: 'Cash Out', description: 'My fourth song', tags: ['fourth song', 'hiphop'], userId: 3}),
    Song.create({order: 5, title: 'Smooth Vibes', description: 'My fifth song', tags: ['fifth song', 'hiphop'], userId: 3}),
    Song.create({order: 6, title: 'Train Ride Home', description: 'My sixth song', tags: ['sixth song', 'hiphop'], userId: 3}),
    Song.create({order: 7, title: 'Thought Train', description: 'My seventh song', tags: ['seventh song', 'hiphop'], userId: 3}),
    Song.create({order: 8, title: 'Ringside', description: 'My eighth song', tags: ['eight song', 'hiphop'], userId: 3})
  ])

  const sections = await Promise.all([
    Section.create({order: 1, name: 'Verse 1', songId: 1}),
    Section.create({order: 2, name: 'Chorus', songId: 1}),
  ])

  const bars = await Promise.all([
    Bar.create({order: 1, sectionId: 1}),
    Bar.create({order: 2, sectionId: 1}),

    Bar.create({order: 1, sectionId: 2}),
    Bar.create({order: 2, sectionId: 2})
  ])

  const beats = await Promise.all([
    Beat.create({order: 1, lyric: 'Chillin', scheme: 'A', barId: 1}),
    Beat.create({order: 2, lyric: 'like a villian', scheme: 'A', barId: 1}),
    Beat.create({order: 3, lyric: 'Im killin', scheme: 'A', barId: 1}),
    Beat.create({order: 4, lyric: 'these rap villians', scheme: 'A', barId: 1}),

    Beat.create({order: 1, lyric: 'Im makin', barId: 2}),
    Beat.create({order: 2, lyric: 'a livin', scheme: 'A', barId: 2}),
    Beat.create({order: 3, lyric: 'with no limits', barId: 2}),
    Beat.create({order: 4, lyric: 'or ceilings', scheme: 'A', barId: 2}),

    Beat.create({order: 1, lyric: 'Progression', scheme: 'B', barId: 3}),
    Beat.create({order: 2, lyric: 'is not a suggestion', scheme: 'B', barId: 3}),
    Beat.create({order: 3, lyric: 'makin moves', barId: 3}),
    Beat.create({order: 4, lyric: 'with learned lessons', scheme: 'B', barId: 3}),

    Beat.create({order: 1, lyric: 'Glasses on', barId: 4}),
    Beat.create({order: 2, lyric: 'feeling studious', scheme: 'C', barId: 4}),
    Beat.create({order: 3, lyric: 'reminiscing challenges', barId: 4}),
    Beat.create({order: 4, lyric: 'stupidness', scheme: 'C', barId: 4})
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${songs.length} songs`)
  console.log(`seeded ${bars.length} bars`)
  console.log(`seeded ${beats.length} beats`)
  console.log(`seeded ${sections.length} sections`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  seed()
  .catch(err => {
    console.error(err)
    process.exitCode = 1
  })
  .then(() => { // `finally` is like then + catch. It runs no matter what.
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })
  /*
   * note: everything outside of the async function is totally synchronous
   * The console.log below will occur before any of the logs that occur inside
   * of the async function
   */
  console.log('seeding...')
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
