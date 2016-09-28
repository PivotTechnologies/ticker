import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buyTickets, fetchTickets } from '../../actions/index';

class BuyerConfirmation extends React.Component {
  componentWillMount() {
    this.props.fetchTickets(this.props.user.id, this.props.auction.id);
  }

  render() {
    return (
      <div>
        <h1>Thanks for purchasing tickets to {this.props.auction.eventName}!</h1>
        <a href={this.props.ticketsUri} download="tickets.pdf">Download Tickets</a>
        <a href={this.props.ticketsUri} target="_blank">View Tickets</a>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    user: state.user,
    ticketsUri: state.tickets,
    auction: state.activeAuction,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ buyTickets, fetchTickets }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerConfirmation);
