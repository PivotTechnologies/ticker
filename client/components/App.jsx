import React from 'react';
import NavBar from './NavBar.jsx';
// import Signup from './generalUser/Signup.jsx';
// import Signin from './generalUser/Signin.jsx';
import BuyerView from './buyer/BuyerView.jsx';
import EventView from './buyer/EventView.jsx';

const App = () => (
  <div>
    <NavBar />
    <BuyerView />
    <EventView />
  </div>
);

export default App;
