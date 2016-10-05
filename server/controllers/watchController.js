const models = require('../models/models');

module.exports = {

  create: (req, res) => {
    const newWatch = models.Watch.build({
      userId: req.body.userId,
      auctionId: req.body.auctionId
    });

    newWatch
      .save()
      .then( watch => {
        res.json({
          id: watch.id,
          userId: watch.userId,
          auctionId: watch.auctionId,
        });
      })
      .catch( err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  remove: (req, res) => {
    models.Watch.findOne({
      where: {
        id: req.body.watchId
      }
    })
    .then( watch => {
      if (watch) {
        watch.destroy();
        res.send('Watch deleted.');
      }
      else {
        res.send('Watch not found.');
      }
    })
    .catch( err => console.log(err) );
  },

  fetch: (req, res) => {
    const results = [];
    models.Watch.findAll({
      where: {
        userId: req.query.userId
      }
    })
    .then( watches => {
      var auctionIds = watches.map( watch => {return watch.auctionId});
      models.Auction.findAll({
        where: {
          id: {$in: auctionIds}
        },
        attributes: ['id', 'eventName', 'eventDate', 'currentPrice']
      })
      .then( auctions => {
        res.json(auctions);
      })
    })
    .catch( err => {
      console.log('Error:', err.message);
      res.send(err.message);
    });
  }

}
