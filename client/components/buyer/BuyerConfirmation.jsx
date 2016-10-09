import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTickets } from '../../actions/index';

class BuyerConfirmation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false
    };
  }

  componentWillMount() {
    if (typeof this.props.auction === 'string') {
      this.setState({ error: true });
    } else {
      this.props.fetchTickets(this.props.user.id, this.props.auction.id);
    }
  }

  render() {
    console.log(this.state.error)
    if (this.state.error) {
      return (
        <div className="auction-view">
          <h3>You can no longer access this page.</h3>
          <p>If you purchased tickets to this event, <br />
           please access them on your account page under buyer history.</p>
        </div>
      );
    }

    return (
      <div className="auction-view">
        <h1>Thanks for purchasing tickets with ticker!</h1>
        <h4>View or download your tickets below and enjoy the event.</h4>
        <FlatButton label="Download Tickets" href={this.props.ticketsUri} download="tickets.pdf" />
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
  return bindActionCreators({ fetchTickets }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerConfirmation);
