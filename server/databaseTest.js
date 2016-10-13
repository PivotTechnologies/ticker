const models = require('./models/models.js');

newAuction = models.Auction.create({
  sellerId: '1',
  buyerId: '1',
  eventId: '1',
  startPrice: '1',
  currentPrice: '1',
  minPrice: '1',
  numTickets: '1',
  sellDate: '',
  status: '',
  eventName: '',
  eventDate: '2016-09-24T21:00:00'
})
.then( auction => console.log(auction.dataValues) )
