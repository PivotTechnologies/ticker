import { SEARCH_EVENTS } from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
    case SEARCH_EVENTS:
      return action.payload.data;

    default:
      return state;
  }
}
