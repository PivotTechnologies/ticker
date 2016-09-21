import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { selectAuction } from '../../actions/index';

class AuctionListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.selectAuction(this.props.auction);
    browserHistory.push(`/auction/${this.props.auction.id}`);
  }

  render() {
    return (
      <div className="list-item" onClick={this.handleClick}>
        <p> Number of Tickets: { this.props.auction.num_tickets } </p>
        <p> Total Price: { this.props.auction.price } </p>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectAuction }, dispatch);
}

export default connect(null, mapDispatchToProps)(AuctionListItem);
