const Sequelize = require('sequelize');
const connection = require('../config/db');

const Watch = connection.define('watch', {
  userId: {
    type: Sequelize.INTEGER
  },
  auctionId: {
    type: Sequelize.INTEGER
  },
  desiredPrice: {
    type: Sequelize.DECIMAL(6, 2)
  },
});

module.exports = Watch;
