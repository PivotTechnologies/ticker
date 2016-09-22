const Sequelize = require('sequelize');
const connection = require('../config/db');

const Auction = connection.define('auction', {
  sellerId: {
    type: Sequelize.STRING
  },
  eventId: {
    type: Sequelize.STRING
  },
  startPrice: {
    type: Sequelize.INTEGER
  },
  minPrice: {
    type: Sequelize.INTEGER
  },
  numTickets: {
    type: Sequelize.INTEGER
  }
});


connection
  .sync()
  .then( err => console.log('\033[34mAuction model sync() successful. \033[0m') )
  .catch( err => console.log('An error occurred while creating the table:', err) )

module.exports = Auction;
