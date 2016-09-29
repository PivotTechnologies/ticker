import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buyTickets } from '../../actions/index';
import { browserHistory } from 'react-router';

class AuctionDetails extends React.Component {
  constructor(props) {
    super(props);

    this.buyTickets = this.buyTickets.bind(this);
  }

  buyTickets() {
    this.props.buyTickets(this.props.user.id, this.props.activeAuction.id)
    .then(response => browserHistory.push('/confirm'));
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
    user: state.user,
    activeAuction: state.activeAuction,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ buyTickets }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionDetails);
