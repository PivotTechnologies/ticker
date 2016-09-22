const Event = require('./models/eventModel');
const Auction = require('./models/auctionModel');
//
// var testAuction = Auction.create({
//   sellerId: '1',
//   eventId: '99',
//   startPrice: '100',
//   minPrice: '50',
//   numTickets: '1',
// });

Event.findOne({
    where: {
      id: 2
    }
  })
  .then( auction => {
    console.log(auction);
    auction.updateAttributes({
      eventId: '1'
    })
  })
  .catch( err => {
    console.log('Error:', err);
  });
