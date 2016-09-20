import { FETCH_AUCTIONS } from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_AUCTIONS:
      return [
        {
          num_tickets: 2,
          price: '$48',
        },
        {
          num_tickets: 2,
          price: '$60',
        },
        {
          num_tickets: 3,
          price: '$90',
        },
      ]; // change to action.payload.data when receiving list from axios

    default:
      return state;
  }
}
