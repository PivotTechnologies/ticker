const Sequelize = require('sequelize');
const connection = require('../config/db');
const password = require('../config/passwordHelper');

const User = connection.define('user', {
  // username 
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
    // validate: {
    //   isEmail: true,
    //   len: [1, 255]
    // }
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
  }
});

connection
  .sync()
  .then( err => console.log('\033[34mUser model sync() successful. \033[0m') )
  .catch( err => console.log('An error occurred while creating the table:', err) )

module.exports = User;
