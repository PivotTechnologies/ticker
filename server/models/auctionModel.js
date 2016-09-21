const Sequelize = require('sequelize');
const connection = require('../config/db');
const Event = require('../models/eventModel');

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

Auction.hasOne(Event, {as: 'Event'});

connection
  .sync()
  .then( err => console.log('\033[34mAuction model sync() successful. \033[0m') )
  .catch( err => console.log('An error occurred while creating the table:', err) )

module.exports = Auction;
