import React from 'react';
import NavBar from './NavBar.jsx';
// // import Signup from './generalUser/Signup.jsx';
// // import Signin from './generalUser/Signin.jsx';
// import BuyerView from './buyer/BuyerView.jsx';
// import EventView from './buyer/EventView.jsx';
// import AuctionView from './buyer/AuctionView.jsx';
// // import UserProfile from './generalUser/UserProfile.jsx';

const App = ({ children }) => (
  <div>
    <NavBar />
    {children}
  </div>
);

export default App;
