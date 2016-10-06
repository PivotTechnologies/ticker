import React from 'react';
import AuctionDetails from './AuctionDetails.jsx';

const EventView = (props) => (
  <div>
    <AuctionDetails auctionId={props.params.auctionId} />
  </div>
);

export default EventView;
