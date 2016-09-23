import { SEARCH_EVENTS, SEARCH_SEATGEEK } from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
    case SEARCH_EVENTS:
      if (!action.payload.data.length) {
        return null;
      }
      return action.payload.data;

    case SEARCH_SEATGEEK:
      //console.log("reducer,", action.payload.data);
      if (!action.payload.data.length) {
        return null;
      }
      return action.payload.data;

    default:
      return state;
  }
}
