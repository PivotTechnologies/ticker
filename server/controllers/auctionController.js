const axios = require('axios');
const Auction = require('../models/auctionModel');
const Event = require('../models/eventModel');

module.exports = {

    create: (req, res) => {
      Event.findOne({
          where: {
            id: req.body.eventId
          }
        })
        .then( event => {
          if(!event){
            // NEED TO CREATE NEW EVENT IF WE DON'T HAVE IT ALREADY
            // ALSO NEED TO DO EVERYTHING IN THE ELSE (CREATE THE AUCTION)
            res.send("Invalid eventId.")
          }
          else {
            const newAuction = Auction.create({
              sellerId: req.body.sellerId,
              buyerId: '',
              eventId: req.body.eventId,
              startPrice: req.body.startPrice,
              currentPrice: req.body.startPrice,
              minPrice: req.body.minPrice,
              numTickets: req.body.numTickets,
              status: 'On Sale',
            })
            .then( (auction) => {
              console.log('New auction created: ', auction.dataValues);
              res.send(auction.dataValues);
            })
            .catch( err => console.log('Error:', err) );
          }
        })
        .catch( err => console.log('Error:', err) );
    },

    cancel: (req, res) => {
      res.send('cancel');
    },

    fetch: (req, res) => {
      const results = [];
      Auction.findAll({
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
