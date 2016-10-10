import axios from 'axios';

export const SEARCH_EVENTS = 'SEARCH_EVENTS';
export const SELECT_EVENT = 'SELECT_EVENT';
export const FETCH_EVENT_BY_ID = 'FETCH_EVENT_BY_ID';
export const FETCH_AUCTIONS = 'FETCH_AUCTIONS';
export const SELECT_AUCTION = 'SELECT_AUCTION';
export const FETCH_AUCTION_BY_ID = 'FETCH_AUCTION_BY_ID';
export const CANCEL_AUCTION = 'CANCEL_AUCTION';
export const WATCH_AUCTION = 'WATCH_AUCTION';
export const REMOVE_WATCH = 'REMOVE_WATCH';
export const FETCH_WATCHLIST = 'FETCH_WATCHLIST';
export const BUY_TICKETS = 'BUY_TICKETS';
export const FETCH_TICKETS = 'FETCH_TICKETS';
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const REAUTHENTICATE = 'REAUTHENTICATE';
export const SIGNOUT = 'SIGNOUT';
export const FETCH_USER_ACTIVITY = 'FETCH_USER_ACTIVITY';
export const SEARCH_SEATGEEK = 'SEARCH_SEATGEEK';
export const CREATE_AUCTION = 'CREATE_AUCTION';
export const CLEAR_EVENTS = 'CLEAR_EVENTS';
export const START_SPINNER = 'START_SPINNER';
export const STOP_SPINNER = 'STOP_SPINNER';
export const CHECKOUT = 'CHECKOUT';
export const GET_CLIENT_TOKEN = 'GET_CLIENT_TOKEN';
export const GET_LOCATION = 'GET_LOCATION';
export const SELECT_MARKER = 'SELECT_MARKER';
export const CLEAR_MARKER = 'CLEAR_MARKER';
export const SELECT_TAB = 'SELECT_TAB';
export const CLEAR_TAB = 'CLEAR_TAB';

export function searchEvents(query, date, location) {
  const data = {
    params: {
      query,
      date,
      location,
    },
  };

  const request = axios.get('/api/event/buyerSearch', data);

  return {
    type: SEARCH_EVENTS,
    payload: request,
  };
}

export function selectEvent(event) {
  return {
    type: SELECT_EVENT,
    payload: event,
  };
}

export function fetchEventById(eventId) {
  const data = {
    params: {
      eventId,
    },
  };

  const request = axios.get('/api/event/fetchById', data);

  return {
    type: FETCH_EVENT_BY_ID,
    payload: request,
  };
}

export function fetchAuctions(eventId) {
  const data = {
    params: {
      eventId,
    },
  };

  const request = axios.get('/api/auction/fetch', data);

  return {
    type: FETCH_AUCTIONS,
    payload: request,
  };
}

export function selectAuction(auction) {
  return {
    type: SELECT_AUCTION,
    payload: auction,
  };
}

export function fetchAuctionById(auctionId, eventId) {
  const data = {
    params: {
      auctionId,
      eventId,
    },
  };

  const request = axios.get('/api/auction/fetchById', data);

  return {
    type: FETCH_AUCTION_BY_ID,
    payload: request,
  };
}

export function cancelAuction(auctionId) {
  const data = {
    auctionId,
  };

  const request = axios.post('/api/auction/cancel', data);

  return {
    type: CANCEL_AUCTION,
    payload: request,
  };
}

export function watchAuction(userId, auctionId) {
  const data = {
    userId,
    auctionId,
  };

  const request = axios.post('/api/watch/create', data);

  return {
    type: WATCH_AUCTION,
    payload: request,
  };
}

export function removeWatch(userId, auctionId) {
  const data = {
    userId,
    auctionId,
  };

  const request = axios.post('/api/watch/remove', data);

  return {
    type: REMOVE_WATCH,
    payload: request,
  };
}

export function fetchWatchList(userId) {
  const data = {
    params: {
      userId,
    },
  };

  const request = axios.get('/api/watch/fetch', data);

  return {
    type: FETCH_WATCHLIST,
    payload: request,
  };
}


export function buyTickets(userId, auctionId) {
  const data = {
    userId,
    auctionId,
  };

  const request = axios.post('/api/auction/buyTickets', data);

  return {
    type: BUY_TICKETS,
    payload: request,
  };
}

export function fetchTickets(userId, auctionId) {
  const data = {
    params: {
      userId,
      auctionId,
    },
  };
console.log(data.params)
  const request = axios.get('/api/auction/fetchTickets', data);

  return {
    type: FETCH_TICKETS,
    payload: request,
  };
}

export function createAuction(event, startPrice, minPrice, numTickets, userId, username, tickets) {
  const data = {
    event,
    startPrice,
    minPrice,
    numTickets,
    userId,
    username,
    tickets,
  };

  const request = axios.post('/api/auction/create', data);

  return {
    type: CREATE_AUCTION,
    payload: request,
  };
}

export function signup(firstName, lastName, username, email, password) {
  const data = {
    firstName,
    lastName,
    username,
    email,
    password,
  };

  const request = axios.post('/api/user/signup', data);

  return {
    type: SIGNUP,
    payload: request,
  };
}

export function signin(username, password) {
  const data = {
    username,
    password,
  };

  const request = axios.post('/api/user/signin', data);


  return {
    type: SIGNIN,
    payload: request,
  };
}

export function reauthenticate(token) {
  const data = {
    token,
  };

  const request = axios.post('/api/user/reauthenticate', data);

  return {
    type: REAUTHENTICATE,
    payload: request,
  };
}

export function signout() {
  localStorage.clear();
  return {
    type: SIGNOUT,
  };
}

export function fetchUserActivity(userId) {
  const data = {
    params: {
      userId,
    },
  };

  const request = axios.get('/api/user/fetchUserActivity', data);

  return {
    type: FETCH_USER_ACTIVITY,
    payload: request,
  };
}

export function searchSeatGeek(query) {
  const data = {
    params: {
      query,
    },
  };

  const request = axios.get('/api/event/sellerSearch', data);

  return {
    type: SEARCH_SEATGEEK,
    payload: request,
  };
}

export function clearEvents() {
  return {
    type: CLEAR_EVENTS,
  };
}

export function startSpinner() {
  return {
    type: START_SPINNER,
  };
}

export function stopSpinner() {
  return {
    type: STOP_SPINNER,
  };
}

export function checkout(payment, amount) {

  const data = {
    payment,
    amount,
  };

  const request = axios.post('/api/payment/checkout', data);

  return {
    type: CHECKOUT,
    payload: request,
  };
}

export function getClientToken() {

  const request = axios.get('/api/payment/token');

  return {
    type: GET_CLIENT_TOKEN,
    payload: request,
  };
}

export function getLocation() {
  return new Promise ((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) {
        resolve(position.coords);
      } else {
        reject(position);
      }
    });
  })
  .then((userLocation) => {
    console.log("userLocation:", userLocation);
    
    return {
      type: GET_LOCATION,
      payload: userLocation,
    };
  });
}

export function selectMarker(activeMarker) {
  return {
    type: SELECT_MARKER,
    payload: activeMarker,
  };
}

export function clearMarker() {
  return {
    type: CLEAR_MARKER,
  };
}

export function selectTab(activeTab) {
  return {
    type: SELECT_TAB,
    payload: activeTab,
  };
}

export function clearTab() {
  return {
    type: CLEAR_TAB,
  };
}
