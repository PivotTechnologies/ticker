import { SEARCH_EVENTS } from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
    case SEARCH_EVENTS:
      return state.concat(action.payload); // change when receiving list from axios

    default:
      return state;
  }
}
