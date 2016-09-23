import { SIGNIN, SIGNUP } from '../actions/index';


export default function (state = {}, action) {
  switch (action.type) {
    case SIGNIN:
      if (action.payload.response) { // if signin failed
        return action.payload.response.data;
      }
      return action.payload; // change when we get data from axios request

    case SIGNUP:
      if (action.payload.response) { // if signup failed
        return action.payload.response.data;
      }
      return action.payload; // change when we get data from axios request

    default:
      return {
        id: 123,
        username: 'carsugar',
      };
  }
}
