import React from 'react';
import { connect } from 'react-redux';
import AuctionListItem from './AuctionListItem.jsx';

class AuctionList extends React.Component {
  renderAuctionList() {
    return this.props.auctions.map((auction, idx) =>
      <AuctionListItem key={idx} auction={auction} />
    );
  }

  render() {
    return (
      <div>
        { this.renderAuctionList() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auctions: state.auctions,
  };
}

export default connect(mapStateToProps)(AuctionList);
