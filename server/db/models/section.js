const Sequelize = require('sequelize')
const db = require('../db')

const Section = db.define('section', {
  order: {
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Section
