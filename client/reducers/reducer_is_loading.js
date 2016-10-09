import { START_SPINNER, STOP_SPINNER, SEARCH_EVENTS, SEARCH_SEATGEEK } from '../actions/index';

export default function (state = false, action) {
  switch (action.type) {
    case START_SPINNER:
      return true;

    case STOP_SPINNER:
      return false;

    case SEARCH_EVENTS:
      return false;

    case SEARCH_SEATGEEK:
      return false;

    default:
      return state;
  }
}
