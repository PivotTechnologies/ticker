const Auction = require('../models/auctionModel');

module.exports = {
    create: (req, res) => {
      res.send('create');
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
