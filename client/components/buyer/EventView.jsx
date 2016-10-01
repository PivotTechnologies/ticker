import React from 'react';
import Paper from 'material-ui/Paper';
import EventDetails from './EventDetails.jsx';
import AuctionList from './AuctionList.jsx';

const EventView = () => (
  <Paper zDepth={0}>
    <EventDetails />
    <div className="auction-list">
      <AuctionList />
    </div>
  </Paper>
);

export default EventView;
