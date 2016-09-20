const Sequelize = require('sequelize');
const connection = require('../config/db');

const Auction = connection.define('auction', {
  seller: {
    type: Sequelize.STRING,
    allowNull: false
  },
  eventId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  venue: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false
  },
  time: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

connection
  .sync()
  .then( err => console.log('\033[34mAuction model sync() successful. \033[0m') )
  .catch( err => console.log('An error occurred while creating the table:', err) )

module.exports = Auction;
