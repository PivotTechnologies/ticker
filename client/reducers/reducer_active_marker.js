import { SELECT_MARKER, CLEAR_MARKER } from '../actions/index';

export default function (state = {}, action) {
  switch (action.type) {
    case SELECT_MARKER:
      return action.payload;

    case CLEAR_MARKER:
      return {};

    default:
      return state;
  }
}
