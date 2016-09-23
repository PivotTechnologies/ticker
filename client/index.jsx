import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import App from './components/App.jsx';
import BuyerView from './components/buyer/BuyerView.jsx';
import EventView from './components/buyer/EventView.jsx';
import AuctionView from './components/buyer/AuctionView.jsx';
import Signup from './components/generalUser/Signup.jsx';
import Signin from './components/generalUser/Signin.jsx';
import UserProfile from './components/generalUser/UserProfile.jsx';
import SellerView from './components/seller/SellerView.jsx';
import SellerForm from './components/seller/SellerForm.jsx';
import createLogger from 'redux-logger';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(ReduxPromise, logger)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={BuyerView} />
        <Route path="event/:eventId" component={EventView} />
        <Route path="auction/:auctionId" component={AuctionView} />
        <Route path="signup" component={Signup} />
        <Route path="signin" component={Signin} />
        <Route path="account" component={UserProfile} />
        <Route path="sell" component={SellerView} />
        <Route path="sell/form" component={SellerForm} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('app'));
