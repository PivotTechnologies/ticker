import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class AuctionDetails extends React.Component {
  buyTickets() {
    browserHistory.push('/confirm');
  }

  render() {
    return (
      <div>
        You are viewing an auction for {this.props.activeAuction.numTickets} ticket(s) to {this.props.activeAuction.eventName} priced at {this.props.activeAuction.currentPrice}.
        <button onClick={this.buyTickets}>Buy Tickets</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeAuction: state.activeAuction,
  };
}

export default connect(mapStateToProps)(AuctionDetails);
