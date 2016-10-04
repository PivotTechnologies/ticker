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
import BuyerConfirmation from './components/buyer/BuyerConfirmation.jsx';
import Signup from './components/generalUser/Signup.jsx';
import Signin from './components/generalUser/Signin.jsx';
import UserProfile from './components/generalUser/UserProfile.jsx';
import SellerView from './components/seller/SellerView.jsx';
import SellerForm from './components/seller/SellerForm.jsx';
import Authentication from './components/hoc/Authentication.jsx';
import SellerConfirmation from './components/seller/SellerConfirmation.jsx';
<<<<<<< 12e3426ae04c0d61e6494fcecd770f47d48a5427
import BuyerForm from './components/buyer/BuyerForm.jsx';
=======
import Maps from './components/Maps.jsx';
>>>>>>> [feature] - saves user geolocation into redux store

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers, window.devToolsExtension ? window.devToolsExtension(): f => f);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={BuyerView} />
        <Route path="event/:eventId" component={EventView} />
        <Route path="auction/:auctionId" component={AuctionView} />
        <Route path="confirm" component={BuyerConfirmation} />
        <Route path="signup" component={Signup} />
        <Route path="signin" component={Signin} />
        <Route path="maps" component={Maps} />
        <Route path="account" component={Authentication(UserProfile)} />
        <Route path="sell" component={Authentication(SellerView)} />
        <Route path="sell/form" component={Authentication(SellerForm)} />
        <Route path="buyerForm" component={Authentication(BuyerForm)} />
        <Route path="sell/confirm" component={Authentication(SellerConfirmation)} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('app'));
