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


const routes = (app, express) => {

  // app.get('/searchTrips', tripController.searchTrips);
  app.get('*', (req, res) => res.sendStatus(404) );

};
module.exports = routes;
