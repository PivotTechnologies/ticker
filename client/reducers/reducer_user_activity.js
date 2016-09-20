import { FETCH_USER_ACTIVITY } from '../actions/index';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_USER_ACTIVITY:
      return action.payload; // change to action.payload.data when receiving activity from axios

    default:
      return state;
  }
}
