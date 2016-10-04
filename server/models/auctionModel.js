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
    type: Sequelize.DECIMAL(6, 2)
  },
  currentPrice: {
    type: Sequelize.DECIMAL(6, 2)
  },
  minPrice: {
    type: Sequelize.DECIMAL(6, 2)
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
    type: Sequelize.DATE
  },
  coefA: {
    type: Sequelize.DOUBLE(11, 12)
  },
  coefB: {
    type: Sequelize.DOUBLE(11, 12)
  },
  startTime: {
    type: Sequelize.DATE
  },
  tickets: {
    type: Sequelize.TEXT
  }
});

module.exports = Auction;
