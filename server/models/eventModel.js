const Sequelize = require('sequelize');
const connection = require('../config/db');

const Event = connection.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  venue: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // address: {
  //   type: Sequelize.STRING,
  //   allowNull: false
  // },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // zip: {
  //   type: Sequelize.STRING,
  //   allowNull: false
  // },
  time: {
    type: Sequelize.TIME,
    allowNull: false
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
});

connection
  .sync()
  .then( err => console.log('\033[34mEvent model sync() successful. \033[0m') )
  .catch( err => console.log('An error occurred while creating the table:', err) )

module.exports = Event;
