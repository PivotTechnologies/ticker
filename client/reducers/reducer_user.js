import { SIGNIN, SIGNUP, REAUTHENTICATE, SIGNOUT } from '../actions/index';

export default function (state = {}, action) {
  switch (action.type) {
    case SIGNIN:
      if (action.payload.response) {
        return action.payload.response.data;
      }
      localStorage.setItem('token', action.payload.data.token);
      return action.payload.data;

    case SIGNUP:
      if (action.payload.response) {
        return action.payload.response.data;
      }
      localStorage.setItem('token', action.payload.data.token);
      return action.payload.data;

    case REAUTHENTICATE:
      return action.payload.data;

    case SIGNOUT:
      return {};

    default:
      return state;
  }
}
