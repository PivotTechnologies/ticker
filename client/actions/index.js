import axios from 'axios';

export const SEARCH_EVENTS = 'SEARCH_EVENTS';
export const SELECT_EVENT = 'SELECT_EVENT';
export const FETCH_AUCTIONS = 'FETCH_AUCTIONS';
export const SELECT_AUCTION = 'SELECT_AUCTION';
export const PURCHASE_TICKETS = 'PURCHASE_TICKETS';
export const SUBMIT_FORM = 'SUBMIT_FORM';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_IN = 'SIGN_IN';
export const FETCH_PROFILE = 'FETCH_PROFILE';

export function searchEvents(city, date, query) {
  const data = {
    city: city,
    date: date,
    query: query
  };

  const request = axios.post('/buyerSearch', data);

  return {
    type: SEARCH_EVENTS,
    payload: request
  };
}

export function selectEvent(event) {
  return {
    type: SELECT_EVENT,
    payload: event
  };
}

export function fetchAuctions(eventID) {
  const data = {
    eventID: eventID
  };

  const request = axios.post('/fetchAuctions', data);

  return {
    type: FETCH_AUCTIONS,
    payload: request
  };
}

export function selectAuction(auction) {
  return {
    type: SELECT_AUCTION,
    payload: auction
  };
}

export function purchaseTickets(userID, auctionID) {
  const data = {
    userID: userID,
    auctionID: auctionID
  };

  const request = axios.post('/purchaseTickets', data);

  return {
    type: PURCHASE_TICKETS,
    payload: request
  };
}

export function submitForm() {
  const data = {
    // ADD FORM DATA
  };
  const request = axios.post('/createAuction', data);

  return {
    type: SUBMIT_FORM,
    payload: request
  };
}

export function signUp() {
  const data = {
    // ADD FORM DATA
  };

  const request = axios.post('/signUp', data);

  return {
    type: SIGN_UP,
    payload: request
  }
}

export function signIn() {
  const data = {
    // ADD FORM DATA
  };

  const request = axios.post('/signIn', data);

  return {
    type: SIGN_IN,
    payload: request
  }
}

export function fetchProfile(userID) {
  const data = {
    userID: userID
  };

  const request = axios.post('/fetchProfile', data)

  return {
    type: FETCH_PROFILE,
    payload: request
  };
}
