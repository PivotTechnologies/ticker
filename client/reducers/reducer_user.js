import { SIGNIN, SIGNUP, AUTHENTICATE, SIGNOUT } from '../actions/index';

export default function (state = {}, action) {
  switch (action.type) {
    case SIGNIN:
      if (action.payload.response) {
        return action.payload.response.data;
      }
      return action.payload.data;

    case SIGNUP:
      if (action.payload.response) {
        return action.payload.response.data;
      }
      return action.payload.data;

    case AUTHENTICATE:
      if (action.payload.response) { // IF TOKEN NOT VALID
        return {};
      }
      return action.payload.data;

    case SIGNOUT:
      return {};

    default:
      return state;
  }
}
