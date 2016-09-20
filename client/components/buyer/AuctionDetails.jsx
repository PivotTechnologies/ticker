import React from 'react';
import { connect } from 'react-redux';

const AuctionDetails = ({ activeAuction }) => {
  if (activeAuction) { // won't need this if when we use react router!!
    return (
      <div>
        You are viewing an auction for {activeAuction.num_tickets} ticket(s)
        priced at {activeAuction.price}.
        <button>Buy Tickets</button>
      </div>
    );
  }

  return <div />;
};

function mapStateToProps(state) {
  return {
    activeAuction: state.activeAuction,
  };
}

export default connect(mapStateToProps)(AuctionDetails);
