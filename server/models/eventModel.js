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
  image: {
    type: Sequelize.STRING
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
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  datetime_local: {
    type: Sequelize.DATE,
    allowNull: false
  },
  timezone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  latitude: {
    type: Sequelize.STRING,
    allowNull: false
  },
  longitude: {
    type: Sequelize.STRING,
    allowNull: false
  },
  numAuctions: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  meta: {
    type: Sequelize.JSON
  }
});

module.exports = Event;
