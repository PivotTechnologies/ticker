import React from 'react';
import NavBar from './NavBar.jsx';
// import Signup from './generalUser/Signup.jsx';
// import Signin from './generalUser/Signin.jsx';
import BuyerView from './buyer/BuyerView.jsx';
import EventView from './buyer/EventView.jsx';
import AuctionView from './buyer/AuctionView.jsx';
// import UserProfile from './generalUser/UserProfile.jsx';

const App = () => (
  <div>
    <NavBar />
    <BuyerView />
    <EventView />
    <AuctionView />
  </div>
);

export default App;
