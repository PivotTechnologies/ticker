const Sequelize = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(
  process.env.db_name,
  process.env.db_user,
  process.env.db_pass,
  {
    host: process.env.db_host,
    dialect: process.env.db_type,
    port: process.env.db_port,
    options: {
      timezone: 'America/Los_Angeles'
  }
});

connection
  .authenticate()
  .then(err => console.log('\033[34mSequelize connected. \033[0m') )
  .catch(err => console.log('Unable to connect to the database:', err) );

module.exports = connection;
