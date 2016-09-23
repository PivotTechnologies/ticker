import { SELECT_EVENT } from '../actions/index';

export default function (state = null, action) {
  switch (action.type) {
    case SELECT_EVENT:
    console.log("insider reducer:", action.payload);
      return action.payload;

    default:
      return state;
  }
}
