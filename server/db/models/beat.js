const Sequelize = require('sequelize')
const db = require('../db')

const Beat = db.define('beat', {
  lyric: {
    type: Sequelize.STRING
  },
  scheme: {
    type: Sequelize.STRING
  }
})

module.exports = Beat
