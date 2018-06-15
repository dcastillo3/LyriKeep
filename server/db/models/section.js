const Sequelize = require('sequelize')
const db = require('../db')

const Section = db.define('section', {
  name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
          notEmpty: true
      }
  }
})

module.exports = Section
