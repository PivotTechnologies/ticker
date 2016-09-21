import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import App from './components/App.jsx';
import Signin from './components/generalUser/Signin.jsx';
import Signup from './components/generalUser/Signup.jsx';
import BuyerView from './components/buyer/BuyerView.jsx';
import EventView from './components/buyer/EventView.jsx';
import AuctionView from './components/buyer/AuctionView.jsx';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={BuyerView} />
        <Route path="event/:event" component={EventView} />
        <Route path="auction/:auction" component={AuctionView} />
        <Route path="signin" component={Signin} />
        <Route path="signup" component={Signup} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('app'));


// <Route path="seller_search" components={SellerSearchView} />
// <Routh path="create_auction" components={SellerFormView} />
