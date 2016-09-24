import React from 'react';
import Paper from 'material-ui/Paper';
import BuyerSearchBar from './BuyerSearchBar.jsx';
import EventList from './EventList.jsx';

const BuyerView = () => (
  <Paper className="main-content" zDepth={0}>
    <h1>Find Tickets</h1>
    <BuyerSearchBar />
    <EventList />
  </Paper>
);

export default BuyerView;
