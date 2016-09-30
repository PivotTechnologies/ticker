const express = require('express');
const cluster = require('cluster');
const schedule = require('node-schedule');
const models = require('./models/models');

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
      // attributes: ['id', 'eventName', 'eventDate', 'startPrice', 'currentPrice', 'minPrice', 'numTickets', 'status']
      attributes: ['id', 'eventName']
    })
    .then( auctions => {
      auctions.forEach( auction => {
        // console.log('auction:', auction.dataValues);
        // recalculate price
        list.push(auction.dataValues)
      });
      console.log('Updating the following auctions: ', list);
    })


});

app.listen(port, () => console.log('\033[34m🎟  Ticker server listening on port: \033[0m', port) );
