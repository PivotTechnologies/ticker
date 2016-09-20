import { SIGNIN } from '../actions/index';

export default function (state = {}, action) {
  switch (action.type) {
    case SIGNIN:
      return action.payload; // change when we add an axios request

    default:
      return state;
  }
}
