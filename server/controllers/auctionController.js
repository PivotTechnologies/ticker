const models = require('../models/models');
const fs = require('fs');

module.exports = {

  create: (req, res) => {
    /* TODO: test to make sure all info is coming it */
    function createAuction() {
      const newAuction = models.Auction.build({
        eventId: auctionEventId,
        sellerId: req.body.userId,
        startPrice: req.body.startPrice,
        currentPrice: req.body.startPrice,
        minPrice: req.body.minPrice,
        numTickets: req.body.numTickets,
        status: 'On Sale',
        eventName: req.body.event.name,
        eventDate: req.body.event.datetime_local,
        tickets: req.body.tickets,
      });

      newAuction
        .save()
        .then(auction => {
          console.log('New auction created: ', auction.dataValues);
          res.send(auction.dataValues);
        })
        .catch(err => console.log('Error:', err))
    }
    let auctionEventId, numAuctions;
    /* look for event passed in */
    models.Event
      .findOne({
        where: {
          name: req.body.event.name,
          venue: req.body.event.venue,
          datetime_local: req.body.event.datetime_local
        }
      })
      .then(event => {
        /* no event found, create it */
        if (!event) {
          newEvent = models.Event.create({
              name: req.body.event.name,
              address: req.body.event.address,
              zip: req.body.event.zip,
              state: req.body.event.state,
              category: req.body.event.category,
              image: req.body.event.image,
              venue: req.body.event.venue,
              city: req.body.event.city,
              category: req.body.event.category,
              datetime_local: req.body.event.datetime_local, // need to convert to pg format
              timezone: req.body.event.timezone,
              latitude: req.body.event.latitude,
              longitude: req.body.event.longitude,
              numAuctions: 1
            })
            .then((event) => {
              console.log('New event created: ', event.dataValues);
              auctionEventId = event.dataValues.id;
              createAuction();
            })
            .catch(err => console.log('Error:', err));
        }
        /* event found */
        else {
          console.log('Event found: ', event.dataValues);
          auctionEventId = event.dataValues.id;
          event.numAuctions += 1;
          event
            .save()
            .then( () => createAuction() )
        }
      })
      .catch(err => console.log('Error:', err));
  },

  cancel: (req, res) => {
    res.send('cancel');
  },

  fetch: (req, res) => {
    const results = [];
    models.Auction.findAll({
        where: {
          eventId: req.query.eventId,
        },
        attributes: [ 'id', 'sellerId', 'buyerId', 'eventId', 'startPrice', 'currentPrice', 'minPrice', 'numTickets', 'sellDate', 'status', 'eventName', 'eventDate']
      })
      .then(auctions => {
        auctions.forEach(auction => results.push(auction.dataValues));
        console.log('\033[34mSending data: \033[0m');
        res.json(results);
      })
      .catch(err => {
        console.log('Error:', err.message);
        res.send(err.message);
      });
  },

  buyTickets: (req, res) => {
    models.Auction
      .findOne({
        where: { id: req.body.auctionId }
      })
      .then(auction => {
        console.log('auction found:', auction)
        if(auction) {
          auction.status = 'Sold';
          auction.sellDate = Date.now();
          auction.buyerId = req.body.userId;
          auction.save();
          console.log('Sold: \n', auction.dataValues)
          res.sendStatus(200);
        }
        else {
          res.send('Auction not found.')
        }
      })
  },

  fetchTickets: (req, res) => {
    models.Auction.findOne({
      where: {
        buyerId: req.query.userId,
        id: req.query.auctionId,
      }
    })
    .then( auction => {
      res.json({ tickets: auction.dataValues.tickets });
    })
    .catch( err => {
      console.log('Error:', err.message);
      res.send(err.message);
    });
  }
}
