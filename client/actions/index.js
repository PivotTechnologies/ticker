import axios from 'axios';

export const SEARCH_EVENTS = 'SEARCH_EVENTS';
export const SELECT_EVENT = 'SELECT_EVENT';
export const FETCH_AUCTIONS = 'FETCH_AUCTIONS';
export const SELECT_AUCTION = 'SELECT_AUCTION';
export const PURCHASE_TICKETS = 'PURCHASE_TICKETS';
export const SUBMIT_FORM = 'SUBMIT_FORM';
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const FETCH_PROFILE = 'FETCH_PROFILE';

export function searchEvents(query, date, city) {
  const data = {
    query,
    date,
    city,
  };
  //
  // const request = axios.post('/buyerSearch', data);

  return {
    type: SEARCH_EVENTS,
    payload: data, // change to request when axios call added
  };
}

export function selectEvent(event) {
  return {
    type: SELECT_EVENT,
    payload: event,
  };
}

export function fetchAuctions(eventID) {
  const data = {
    eventID,
  };

  // const request = axios.post('/fetchAuctions', data);

  return {
    type: FETCH_AUCTIONS,
    payload: data, // change to request when axios call added
  };
}

export function selectAuction(auction) {
  return {
    type: SELECT_AUCTION,
    payload: auction,
  };
}

export function purchaseTickets(userID, auctionID) {
  const data = {
    userID,
    auctionID,
  };

  const request = axios.post('/purchaseTickets', data);

  return {
    type: PURCHASE_TICKETS,
    payload: request,
  };
}

export function submitForm() {
  const data = {
    // ADD FORM DATA
  };
  const request = axios.post('/createAuction', data);

  return {
    type: SUBMIT_FORM,
    payload: request,
  };
}

export function signup() {
  const data = {
    // ADD FORM DATA
  };

  const request = axios.post('/signUp', data);

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

  // const request = axios.post('/signIn', data);

  return {
    type: SIGNIN,
    payload: data, //request,
  };
}

export function fetchProfile(userID) {
  const data = {
    userID,
  };

  const request = axios.post('/fetchProfile', data);

  return {
    type: FETCH_PROFILE,
    payload: request,
  };
}
