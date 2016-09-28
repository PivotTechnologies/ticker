import { FETCH_TICKETS } from '../actions/index';

export default function (state = '', action) {
  switch (action.type) {
    case FETCH_TICKETS:
      return action.payload.data.tickets;

    default:
      return state;
  }
}
