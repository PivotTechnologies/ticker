import { SIGNIN, SIGNUP } from '../actions/index';


export default function (state = {}, action) {
  switch (action.type) {
    case SIGNIN:
      if (action.payload.response) {
        return action.payload.response.data;
      }
      localStorage.setItem('userId', action.payload.data.id);
      localStorage.setItem('email', action.payload.data.email);
      localStorage.setItem('username', action.payload.data.username);
      return action.payload.data;

    case SIGNUP:
      if (action.payload.response) {
        return action.payload.response.data;
      }
      localStorage.setItem('userId', action.payload.data.id);
      localStorage.setItem('email', action.payload.data.email);
      localStorage.setItem('username', action.payload.data.username);
      return action.payload.data;

    default:
      return state;
  }
}
