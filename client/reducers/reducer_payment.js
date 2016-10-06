import { GET_CLIENT_TOKEN } from '../actions/index';

export default function (state = '', action) {
  switch (action.type) {
    case GET_CLIENT_TOKEN:
      console.log('reducer_payment -> GET_CLIENT_TOKEN -> ', action.payload.data);
      localStorage.setItem('clientToken', action.payload.data);
      return action.payload.data;

    default:
      return state;
  }
}
