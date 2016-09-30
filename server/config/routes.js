const userController = require('../controllers/userController');
const eventController = require('../controllers/eventController');
const auctionController = require('../controllers/auctionController');
const path = require('path');

const routes = (app, express) => {

  /* User Endpoints */
  app.post('/api/user/signup', userController.signup );
  app.post('/api/user/signin', userController.signin );
  app.post('/api/user/reauthenticate', userController.reauthenticate);
  app.get('/api/user/fetchUserActivity', userController.fetchUserActivity );

  /* Event Endpoints */
  app.get('/api/event/buyerSearch', eventController.buyerSearch );
  app.get('/api/event/sellerSearch', eventController.sellerSearch );
  app.get('/api/event/fetch', eventController.fetch);

  /* Auction Endpoints */
  app.post('/api/auction/create', auctionController.create );
  app.get('/api/auction/cancel', auctionController.cancel );
  app.get('/api/auction/fetch', auctionController.fetch );
  app.get('/api/auction/fetchById', auctionController.fetchById );
  app.post('/api/auction/buyTickets', auctionController.buyTickets );
  app.get('/api/auction/fetchTickets', auctionController.fetchTickets );

  /* Other Endpoints */
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('./', 'client', 'index.html'))
  })
  app.get('*', (req, res) => res.sendStatus(404) );
};

module.exports = routes;
