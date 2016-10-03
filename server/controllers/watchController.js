const models = require('../models/models');

module.exports = {

  create: (req, res) => {
    const newWatch = models.Watch.build({
      userId: req.body.userId,
      auctionId: req.body.auctionId,
      desiredPrice: req.body.desiredPrice
    });

    newWatch
      .save()
      .then( watch => {
        res.json({
          id: watch.id,
          userId: watch.userId,
          auctionId: watch.auctionId,
          desiredPrice: watch.desiredPrice,
        });
      })
      .catch( err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  cancel: (req, res) => {
    res.send('cancel')
  }

}
