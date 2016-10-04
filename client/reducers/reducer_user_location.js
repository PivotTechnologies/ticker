import { GET_LOCATION } from '../actions/index';

export default function (state = {}, action) {
  switch (action.type) {
    case GET_LOCATION:
      console.log('action payload inside of GET_LOCATION: ', action.payload);
      return action.payload;

    default:
      return state;
  }
}
