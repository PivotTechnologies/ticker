import { CREATE_AUCTION } from '../actions/index';

export default function (state = {}, action) {
  switch (action.type) {
    case CREATE_AUCTION:
      return action.payload.data;

    default:
      return state;
  }
}
