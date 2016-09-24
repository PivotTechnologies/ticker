const models = require('./models/models.js');

// newEvent = models.Event.create({
//   // update schema
//   name: 'req.body.event.name2',
//   address: 'req.body.event.address',
//   zip: 'req.body.event.zip',
//   state: 'req.body.event.state',
//   category: 'req.body.event.category',
//   image: 'req.body.event.image',
//   venue: 'req.body.event.venue',
//   city: 'req.body.event.city',
//   category: 'req.body.event.category',
//   datetime_local: '2016-09-24T21:00:00',
//   timezone: 'req.body.event.timezone',
//   latitude: 'req.body.event.latitude',
//   longitude: 'req.body.event.longitude'
// })
// .then( event => console.log(event.dataValues) )

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
