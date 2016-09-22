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
            });
          }
        })
        .catch( err => console.log('Error:', err) );
    },

    cancel: (req, res) => {
      res.send('cancel');
    },

    fetch: (req, res) => {
      res.send('fetch');
    },

    buy: (req, res) => {
      res.send('buy');
    }
}
