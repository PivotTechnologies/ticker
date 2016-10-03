const express = require('express');
const cluster = require('cluster');
const schedule = require('node-schedule');
const models = require('./models/models');
const pricing = require('./config/pricingHelper');
const app = express();
const port = process.env.PORT || 3000;

require('./config/middleware')(app, express);
require('./config/routes')(app, express);

const decrementPrice = schedule.scheduleJob('*/5 * * * * *', () => {
  const list = [];
  models.Auction
    .findAll({
      where: {
        status: 'On Sale'
      },
      attributes: [
        'id', 'eventName', 'eventDate', 'minPrice',
        'startTime', 'startPrice',
        'coefA', 'coefB'
      ]
    })
    .then( auctions => {
      auctions.forEach( auction => {
        auction.currentPrice = pricing.calculatePrice( auction.dataValues.startTime,
                                                       auction.dataValues.startPrice,
                                                       auction.dataValues.coefA,
                                                       auction.dataValues.coefB );
        auction.save();
      });
    })
});

app.listen(port, () => console.log('\033[34m🎟  Ticker server listening on port: \033[0m', port) );
