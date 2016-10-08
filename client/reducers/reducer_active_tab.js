import { SELECT_TAB, CLEAR_TAB } from '../actions/index';

export default function(state = '', action) {
  switch (action.type) {
    case SELECT_TAB:
      return action.payload;

    case CLEAR_TAB:
        return 'a';

    default:
      return state;
  }
}
