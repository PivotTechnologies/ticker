import { SELECT_EVENT, FETCH_EVENT_BY_ID } from '../actions/index';

export default function (state = null, action) {
  switch (action.type) {
    case SELECT_EVENT:
      return action.payload;

    case FETCH_EVENT_BY_ID:
      return action.payload.data;

    default:
      return state;
  }
}
