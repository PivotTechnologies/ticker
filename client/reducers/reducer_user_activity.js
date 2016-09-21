import { FETCH_USER_ACTIVITY } from '../actions/index';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_USER_ACTIVITY:
      return action.payload; // change to action.payload.data when receiving activity from axios

    default:
      return {
        username: 'carsugar',
        buyerHistory: [
          'Frank Ocean - 2 tickets - $80',
          'Bon Iver - 1 ticket - $50',
        ],
        sellerHistory: [
          'Book of Mormon - 2 tickets - $180 - ON SALE',
          'Chicago Bulls vs. New York Knicks - 3 tickets - $90 - SOLD',
        ],
      }; // return state
  }
}
