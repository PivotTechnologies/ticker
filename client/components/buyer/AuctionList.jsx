import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import { connect } from 'react-redux';
import AuctionListItem from './AuctionListItem.jsx';

class AuctionList extends React.Component {
  renderAuctionList() {
    if (!this.props.auctions.length) {
      return (
        <div>
          <LinearProgress
            style={{ height: '4px' }}
            mode="indeterminate"
            color="#f2b632"
          />
        </div>
      );
    }

    return this.props.auctions.map((auction, idx) =>
      <AuctionListItem key={idx} auction={auction} />
    );
  }

  render() {
    return (
      <div>
        {this.renderAuctionList()}
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
