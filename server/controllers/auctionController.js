const Auction = require('../models/auctionModel');
const Event = require('../models/eventModel');

module.exports = {

    create: (req, res) => {
      // query for valid sellerId
      Event.findOne({
          where: {
            id: req.body.eventId
          }
        })
        .then( event => {
          if(!event){
            res.send("Invalid eventId.")
          }
          else {
            const newAuction = Auction.create({
              sellerId: req.body.sellerId,
              eventId: req.body.eventId,
              startPrice: req.body.startPrice,
              minPrice: req.body.minPrice,
              numTickets: req.body.numTickets,
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
          eventId: req.query.eventID,
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
