const Sequelize = require('sequelize')
const db = require('../db')

const Beat = db.define('beat', {
  order: {
    type: Sequelize.INTEGER
  },
  lyric: {
    type: Sequelize.STRING
  },
  scheme: {
    type: Sequelize.STRING,
    defaultValue: 'none'
  }
})

module.exports = Beat
