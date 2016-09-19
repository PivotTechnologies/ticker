import { SELECT_AUCTION } from '../actions/index';

export default function(state = null, action) {
  switch (action.type) {
    case SELECT_AUCTION:
      return action.payload;
  }

  return state;
};
