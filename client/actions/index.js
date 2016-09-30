import axios from 'axios';

export const SEARCH_EVENTS = 'SEARCH_EVENTS';
export const SELECT_EVENT = 'SELECT_EVENT';
export const FETCH_AUCTIONS = 'FETCH_AUCTIONS';
export const SELECT_AUCTION = 'SELECT_AUCTION';
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

  const request = axios.get('/api/auction/fetchTickets', data);

  return {
    type: FETCH_TICKETS,
    payload: request,
  };
}

export function createAuction(event, startPrice, minPrice, numTickets, userId, tickets) {
  const data = {
    event,
    startPrice,
    minPrice,
    numTickets,
    userId,
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
