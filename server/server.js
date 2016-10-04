const express = require('express');
const cluster = require('cluster');
const schedule = require('node-schedule');
const moment = require('moment-timezone');
const models = require('./models/models');
const pricing = require('./config/pricingHelper');
const app = express();
const port = process.env.PORT || 3000;

require('./config/middleware')(app, express);
require('./config/routes')(app, express);

const decrementPrice = schedule.scheduleJob('*/5 * * * * *', () => {
  models.Auction.findAll({
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
//0 * * * * -> every hour
const expireAuctions = schedule.scheduleJob('*/5 * * * * *', () => {
  const now = new Date();
  const nowLA = new Date(moment.tz(now, 'America/Los_Angeles').format('YYYY-MM-DDTHH:mm:ss'));
  console.log("IT IS NOW:", nowLA)

  models.Event.findAll({
    where: {
      eventDate: {
        $lte: nowLA
      }
    },
    attributes: ['id', 'numAuctions']
  })
  .then( events => {
    events.forEach( event => {
      models.Auction.findAll({
        where: {
          eventId: event.id,
          status: 'On Sale'
        },
        attributes: ['id', 'status']
      })
      .then( auctions => {
        auctions.forEach( auction => {
          auction.status = 'Expired';
          auction.save();
        })
      })
      event.numAuctions = 0;
      event.save();
    });
  })
});

app.listen(port, () => console.log('\033[34m🎟  Ticker server listening on port: \033[0m', port) );
