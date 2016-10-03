const models = require('../models/models');
const fs = require('fs');
const prices = require('../config/pricingHelper.js');
var moment = require('moment-timezone');

module.exports = {

  create: (req, res) => {

    const formattedEventDate  = moment(req.body.event.datetime_local, "YYYY-MM-DDTHH:mm:ss").format('YYYY-MM-DDTHH:mm:ss.sss') + 'Z';
    const startTime = new Date( moment(new Date()).tz(req.body.event.timezone) );
    const endTime  = new Date( moment(req.body.event.datetime_local, "YYYY-MM-DDTHH:mm:ss") );

    const computed = prices.findCoefficients(req.body.startPrice,
                                             req.body.minPrice,
                                             startTime,
                                             endTime );

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
        eventDate: formattedEventDate,
        tickets: req.body.tickets,
        coefA: computed.a,
        coefB: computed.b,
        startTime: startTime
      });

      newAuction
        .save()
        .then(auction => {
          console.log('New auction created: ');
          console.log('  id:',  auction.dataValues.id);
          console.log('  name:',  auction.dataValues.eventName);
          console.log('  eventDate:',  auction.dataValues.eventDate);
          console.log('  startTime:',  auction.dataValues.startTime);
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
          datetime_local: formattedEventDate
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
              datetime_local: formattedEventDate,
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
    models.Auction.findOne({
      where: {
        id: req.body.auctionId
      }
    })
    .then( auction => {
      if (auction) {
        models.Event.findOne({
          where: {
            id: auction.eventId
          }
        })
        .then( event => {
          event.numAuctions -= 1;
          event.save();
        })

        auction.destroy();
        res.send('Auction deleted.');
      }
      else {
        res.send('Auction not found.');
      }
    })
    .catch( err => console.log(err) );
  },

  fetch: (req, res) => {
    const results = [];
    models.Auction.findAll({
      where: {
        eventId: req.query.eventId,
      },
      attributes: [
        'id',
        'sellerId',
        'buyerId',
        'eventId',
        'startPrice',
        'currentPrice',
        'minPrice',
        'numTickets',
        'sellDate',
        'status',
        'eventName',
        'eventDate'
      ]
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

  fetchById: (req, res) => {
    models.Auction.findOne({
      where: {
        id: req.query.auctionId
      },
      attributes: [
        'id',
        'sellerId',
        'buyerId',
        'eventId',
        'startPrice',
        'currentPrice',
        'minPrice',
        'numTickets',
        'sellDate',
        'status',
        'eventName',
        'eventDate'
      ]
    })
    .then( auction => {
      if (auction) {
        res.json(auction.dataValues);
      }
      else {
        res.send('Auction not found.');
      }
    })
    .catch( err => console.log(err) )
  },

  buyTickets: (req, res) => {
    models.Auction
      .findOne({
        where: { id: req.body.auctionId }
      })
      .then(auction => {
        console.log('auction found:', auction)
        if(auction) {
          models.Event.findOne({
            where: {
              id: auction.eventId
            }
          })
          .then( event => {
            event.numAuctions -= 1;
            event.save();
          })

          auction.status = 'Sold';
          auction.sellDate = Date.now();
          auction.buyerId = req.body.userId;
          auction.save();
          //console.log('Sold: \n', auction.dataValues)
          res.sendStatus(200);
        }
        else {
          res.send('Auction not found.')
        }
      });
  },

  fetchTickets: (req, res) => {
    models.Auction.findOne({
      where: {
        buyerId: req.query.userId,
        id: req.query.auctionId,
      }
    })
    .then( auction => {
      //console.log(auction.dataValues.tickets)
      res.json({ tickets: auction.dataValues.tickets });
    })
    .catch( err => {
      console.log('Error:', err.message);
      res.send(err.message);
    });
  }
}
