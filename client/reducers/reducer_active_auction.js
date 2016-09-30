import { SELECT_AUCTION, FETCH_AUCTION_BY_ID } from '../actions/index';

export default function (state = null, action) {
  switch (action.type) {
    case SELECT_AUCTION:
      return action.payload;

    case FETCH_AUCTION_BY_ID:
      return action.payload.data;

    default:
      return state;
  }
}
