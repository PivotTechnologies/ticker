const Sequelize = require('sequelize');
const connection = require('../config/db');

const Auction = connection.define('auction', {
  sellerId: { // remove
    type: Sequelize.INTEGER
  },
  buyerId: { // remove
    type: Sequelize.INTEGER
  },
  eventId: { // remove
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
  sellDate: {
    type: Sequelize.DATE
  },
  /* Statuses: 'On Sale', 'Sold', 'Expired' */
  status: {
    type: Sequelize.STRING
  },
  eventName: {
    type: Sequelize.STRING
  },
  eventDate: {
    type: Sequelize.STRING
  },
  tickets: {
    type: Sequelize.TEXT
  },
});

module.exports = Auction;
