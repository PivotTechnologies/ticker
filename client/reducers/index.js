import { combineReducers } from 'redux';
import EventsReducer from './reducer_events';
import ActiveEventReducer from './reducer_active_event';
import AuctionsReducer from './reducer_auctions';
import ActiveAuctionReducer from './reducer_active_auction';
import TicketsReducer from './reducer_tickets';
import UserReducer from './reducer_user';
import UserActivityReducer from './reducer_user_activity';
import NewAuctionReducer from './reducer_new_auction';
import isLoadingReducer from './reducer_is_loading';
import PaymentReducer from './reducer_payment';

const rootReducer = combineReducers({
  events: EventsReducer,
  activeEvent: ActiveEventReducer,
  auctions: AuctionsReducer,
  activeAuction: ActiveAuctionReducer,
  tickets: TicketsReducer,
  user: UserReducer,
  userActivity: UserActivityReducer,
  newAuction: NewAuctionReducer,
  isLoading: isLoadingReducer,
  paymentToken: PaymentReducer,
});

export default rootReducer;
