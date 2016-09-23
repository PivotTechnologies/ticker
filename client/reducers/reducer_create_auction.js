import { CREATE_AUCTION } from '../actions/index';

export default function (state = {}, action) {
  switch (action.type) {
    case CREATE_AUCTION:
    console.log("inside reducer create auction");
      return action.payload;

    default:
      return state;
  }
}
