import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buyTickets, fetchAuctionById } from '../../actions/index';
import { browserHistory } from 'react-router';

class AuctionDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      intervalId: null
    };

    this.buyTickets = this.buyTickets.bind(this);
  }

  componentDidMount() {
    const id = setInterval(() => {
      console.log('updating active auction!')
      this.props.fetchAuctionById(this.props.activeAuction.id);
    }, 1000);
    this.setState({ intervalId: id });
  }

  componentWillUnmount() {
    console.log('no longer updating active auction')
    clearInterval(this.state.intervalId);
  }

  buyTickets() {
    if (localStorage.getItem('token')) {
      this.props.buyTickets(this.props.user.id, this.props.activeAuction.id)
        .then(response => browserHistory.push('/confirm'));
    } else {
      browserHistory.push('/signin');
    }
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
  return bindActionCreators({ buyTickets, fetchAuctionById }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionDetails);
