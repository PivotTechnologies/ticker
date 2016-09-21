const Event = require('./models/eventModel');
const Auction = require('./models/auctionModel');

var testAuction = Auction.create({
  sellerId: '1',
//  eventId: '1',
  startPrice: '100',
  minPrice: '50',
  numTickets: '1',
});

testAuction.setEvent(1);
