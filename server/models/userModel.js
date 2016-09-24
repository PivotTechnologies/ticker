const Sequelize = require('sequelize');
const connection = require('../config/db');
const password = require('../config/passwordHelper');

const User = connection.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
      len: [1, 255]
    }
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    //set: value => setDataValue('password', password.hash(value) )
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  average_rating: {
    type: Sequelize.INTEGER,
    defaultValue: 5
  },
  meta: {
    type: Sequelize.JSON
  }
});

module.exports = User;
