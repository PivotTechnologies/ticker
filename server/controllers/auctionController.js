const models = require('../models/models');

module.exports = {

  create: (req, res) => {
    /* TODO: test to make sure all info is coming it */
    let auctionEventId;
    /* create auction model, doesn't save to db yet*/
    const newAuction = models.Auction.build({
      eventId: '',
      sellerId: req.body.userId,
      startPrice: req.body.startPrice,
      minPrice: req.body.minPrice,
      numTickets: req.body.numTickets,
      status: 'On Sale',
    })
    /* look for event passed in */
    models.Event
      .findOne({
        where: {
          name: {
            $iLike: req.body.event.name
          },
          venue: {
            $iLike: req.body.event.venue
          },
          // date: {
          //   $eq: req.body.event.datetime_local
          // },
        }
      })
      .then( event => {
        /* no event found, create it */
        if(!event){
          newEvent = models.Event.create({
            // update schema
            name: req.body.event.name,
            venue: req.body.event.venue,
            city: req.body.event.city,
            time: req.body.event.time,
            category: req.body.event.category,
            date: req.body.event.date
          })
          .then( (event) => {
            console.log('New event created: ', event.dataValues);
            auctionEventId = event.dataValues.id;
          })
          .catch( err => console.log('Error:', err) );
        }
        /* event found */
        else {
          console.log('Event found: ', event.dataValues);
          auctionEventId = event.dataValues.id;
        }
        /* update our auction with event details */
        newAuction.eventId = auctionEventId;
        newAuction
          .save()
          .then( auction => {
            console.log('New auction created: ', auction.dataValues);
            res.send(auction.dataValues);
          })
          .catch( err => console.log('Error:', err) )
      })
      .catch( err => console.log('Error:', err) );
    },

    cancel: (req, res) => {
      res.send('cancel');
    },

    fetch: (req, res) => {
      const results = [];
      models.Auction.findAll({
        where: {
          eventId: req.query.eventId,
        }
      })
      .then( auctions => {
        auctions.forEach( auction => results.push(auction.dataValues) );
        console.log('\033[34mSending data: \033[0m');
        console.log(results);
        res.json(results);
      })
      .catch( err => {
        console.log('Error:', err.message);
        res.send(err.message);
      });
    },

    buy: (req, res) => {
      res.send('buy');
    }
}
