const Event = require('../models/eventModel');
const Auction = require('../models/auctionModel');
const User = require('../models/userModel');
const Watch = require('../models/watchModel');
const connection = require('../config/db');

Event.hasMany(Auction);
Auction.belongsTo(Event);

connection
  .sync()
  .then( err => console.log('\033[34mModels sync() successful. \033[0m') )
  .catch( err => console.log('An error occurred while creating the table:', err) )

module.exports = {
  User: User,
  Event: Event,
  Auction: Auction,
  Watch: Watch
}
