import { SELECT_EVENT } from '../actions/index';

export default function (state = null, action) {
  switch (action.type) {
    case SELECT_EVENT:
      return action.payload;

    default:
      return state;
  }
}
