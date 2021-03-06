const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Song = require('./song')
const Section = require('./section')
const Bar = require('./bar')
const Beat = require('./beat')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  isAdmin: {
    type: Sequelize.STRING,
    defaultValue: false
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.findAllSongs = function (userId) {
  return Song.findAll({
    where: {
      userId
    }
  })
}

User.findSongById = function (userId, songId) {
  return Song.findOne({
    where: {
      userId,
      id: songId
    },
    include: {
      model: Section,
      include: {
        model: Bar,
        include: {
          model: Beat
        }
      }
    }
  })
}

User.createBar = function (sectionId, order) {
  return Bar.create({
      order,
      sectionId
    })
    .then(createdBar => {
      let barId = createdBar.dataValues.id;
      let idx = 1;
      for (let i = idx; i <= 4; i++) {
        Beat.create({
          scheme: 'none',
          order: i,
          barId
        })
      }
    })
}

User.createSection = function (songId, order, name) {
  return Section.create({
    songId,
    order,
    name
  })
  .then(createdSection => {
    let sectionId = createdSection.dataValues.id
    let barOrder = 1
    return User.createBar(sectionId, barOrder)
  })
}

User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
