import React from 'react';
import BuyerSearchBar from './BuyerSearchBar.jsx';
import EventList from './EventList.jsx';

const BuyerView = () => (
  <div className="main-content">
    <BuyerSearchBar />
    <EventList />
  </div>
);

export default BuyerView;
