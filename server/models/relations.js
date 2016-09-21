const Event = require('../models/eventModel');
const Auction = require('../models/auctionModel');

//Event.hasMany(Auction, {as: 'Auctions' });
Auction.hasOne(Event, {as: 'Event'});
