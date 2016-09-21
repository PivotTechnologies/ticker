const Event = require('../models/eventModel');
const Auction = require('../models/auctionModel');

Event.hasMany(Auction);
Auction.hasOne(Event);
