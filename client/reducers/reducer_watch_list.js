import { FETCH_WATCHLIST } from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_WATCHLIST:
      if (!action.payload.data.length) {
        return null;
      }
      return action.payload.data;

    default:
      return state;
  }
}
