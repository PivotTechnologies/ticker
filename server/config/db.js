const Sequelize = require('sequelize');
require('dotenv').config();

const connection = new Sequelize('trppr2', process.env.db_user, process.env.db_pass, {
  host: process.env.db_host,
  dialect: 'postgres',
  port: process.env.db_port,
  logging: false,
  options: {
    timezone: 'America/Los_Angeles'
  }
});

connection
  .authenticate()
  .then(err => console.log('Sequelize connected.') )
  .catch(err => console.log('Unable to connect to the database:', err) );

module.exports = connection;
