const Sequelize = require('sequelize')
const db = require('../db')

const Bar = db.define('bar', {
  order: {
      type: Sequelize.INTEGER
  }
})

module.exports = Bar
