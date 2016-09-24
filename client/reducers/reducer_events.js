import { SEARCH_EVENTS, SEARCH_SEATGEEK, CLEAR_EVENTS } from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
    case SEARCH_EVENTS:
      if (!action.payload.data.length) {
        return null;
      }
      return action.payload.data;

    case SEARCH_SEATGEEK:
      if (!action.payload.data.length) {
        return null;
      }
      return action.payload.data;

    case CLEAR_EVENTS:
      return [];

    default:
      return state;
  }
}
