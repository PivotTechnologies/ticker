import { SEARCH_EVENTS } from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
    case SEARCH_EVENTS:
      return [
        {
          id: 1,
          name: 'Beyonce',
          datetime: '10/10/16 8:00pm',
          venue: 'Hollywood Bowl',
          city: 'Los Angeles, CA',
        },
        {
          id: 2,
          name: 'The Beatles',
          datetime: '04/14/1960 7:00pm',
          venue: 'The Echo',
          city: 'Los Angeles, CA',
        },
        {
          id: 3,
          name: 'Goatwhore',
          datetime: '9/25/16 10:00pm',
          venue: 'The Fonda',
          city: 'Los Angeles, CA',
        },
      ]; // change to action.payload.data when receiving list from axios

    default:
      return state;
  }
}
