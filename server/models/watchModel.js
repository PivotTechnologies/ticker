const Sequelize = require('sequelize');
const connection = require('../config/db');

const Watch = connection.define('watch', {
  userId: {
    type: Sequelize.INTEGER
  },
  auctionId: {
    type: Sequelize.INTEGER
  },
});

module.exports = Watch;
