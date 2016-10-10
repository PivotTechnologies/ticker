import React from 'react';
import Paper from 'material-ui/Paper';
import BuyerSearchBar from './BuyerSearchBar.jsx';
import EventsTabView from './EventsTabView.jsx';

const BuyerView = () => (
  <Paper className="main-content" zDepth={0} style={{background: '#e1e3e4'}}>
    <h1>Find Tickets</h1>
    <BuyerSearchBar />
    <EventsTabView />
  </Paper>
);

export default BuyerView;
