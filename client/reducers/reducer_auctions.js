import { FETCH_AUCTIONS } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_AUCTIONS:
      return action.payload.data;
  }

  return state;
};
