import { combineReducers } from 'redux';
import EventsReducer from './reducer_events';
import ActiveEventReducer from './reducer_active_event';
import AuctionsReducer from './reducer_auctions';
import ActiveAuctionReducer from './reducer_active_auction';
import UserReducer from './reducer_user';
import UserActivityReducer from './reducer_user_activity';
import CreateAuctionReducer from './reducer_create_auction';
import isLoadingReducer from './reducer_is_loading';

const rootReducer = combineReducers({
  events: EventsReducer,
  activeEvent: ActiveEventReducer,
  auctions: AuctionsReducer,
  activeAuction: ActiveAuctionReducer,
  user: UserReducer,
  userActivity: UserActivityReducer,
  newAuction: CreateAuctionReducer,
  isLoading: isLoadingReducer,
});

export default rootReducer;
