import { combineReducers } from 'redux';
import EventsReducer from './reducer_events';
import ActiveEventReducer from './reducer_active_event';
import AuctionsReducer from './reducer_auctions';
import ActiveAuctionReducer from './reducer_active_auction';
import UserReducer from './reducer_user';

const rootReducer = combineReducers({
  events: EventsReducer,
  activeEvent: ActiveEventReducer,
  auctions: AuctionsReducer,
  activeAuction: ActiveAuctionReducer,
  user: UserReducer,
});

export default rootReducer;
