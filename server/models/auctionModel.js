const Sequelize = require('sequelize');
const connection = require('../config/db');

const Auction = connection.define('auction', {
  sellerId: {
    type: Sequelize.INTEGER
  },
  buyerId: {
    type: Sequelize.INTEGER
  },
  eventId: {
    type: Sequelize.INTEGER
  },
  startPrice: {
    type: Sequelize.INTEGER
  },
  currentPrice: {
    type: Sequelize.INTEGER
  },
  minPrice: {
    type: Sequelize.INTEGER
  },
  numTickets: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.STRING
  }
});


connection
  .sync()
  .then( err => console.log('\033[34mAuction model sync() successful. \033[0m') )
  .catch( err => console.log('An error occurred while creating the table:', err) )

module.exports = Auction;
