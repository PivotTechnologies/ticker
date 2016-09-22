// endpoints
/* user actions */
// /signup
// /signin
// /getProfile -> return active or past auctions, buy or sell

/* event actions */
// /buyerSearch
  // takes: query(event name, category, venue), location or date
  // returns: array of matching event objects

/* auction actions */
// /createAuction -> also creates the event if not there, updates event_tickets_available
// /sellerSearch
// /cancelAuction -> removes the auction if seller cancels or auction expires
// /getAuctions
  // takes: eventId
  // returns: array of auction objects
// /buyTickets -> will de-list auction

const userController = require('../controllers/userController');
const eventController = require('../controllers/eventController');
const auctionController = require('../controllers/auctionController');
const path = require('path');

const routes = (app, express) => {

  /* User Endpoints */
  app.post('/api/user/signup', userController.signup );
  app.post('/api/user/signin', userController.signin );
  app.get('/api/user/fetchUserActivity', userController.fetchUserActivity );

  /* Event Endpoints */
  app.get('/api/event/buyerSearch', eventController.buyerSearch );
  app.get('/api/event/sellerSearch', eventController.sellerSearch );
  app.get('/api/event/fetch', eventController.fetch);
  app.post('/api/event/findOrMake', eventController.findOrMake);

  /* Auction Endpoints */
  app.post('/api/auction/create', auctionController.create );
  app.get('/api/auction/cancel', auctionController.cancel );
  app.get('/api/auction/fetch', auctionController.fetch );
  app.get('/api/auction/buy', auctionController.buy );

  /* Other Endpoints */
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('./', 'client', 'index.html'))
  })
  app.get('*', (req, res) => res.sendStatus(404) );
};

module.exports = routes;
