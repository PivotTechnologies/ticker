import React from 'react';
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buyTickets, fetchAuctionById, watchAuction, fetchWatchList } from '../../actions/index';
import { browserHistory } from 'react-router';

class AuctionDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      intervalId: null,
      open: false,
    };

    this.buyTickets = this.buyTickets.bind(this);
    this.openWatchModal = this.openWatchModal.bind(this);
    this.closeWatchModal = this.closeWatchModal.bind(this);
    this.watchAuction = this.watchAuction.bind(this);
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
    this.props.buyTickets(this.props.user.id, this.props.activeAuction.id)
    .then(response => browserHistory.push('/confirm'));
  }

  openWatchModal() {
    this.setState({ open: true });
  }

  closeWatchModal() {
    this.setState({ open: false });
  }

  watchAuction() {
    this.props.watchAuction(this.props.user.id, this.props.activeAuction.id)
    .then(response => this.props.fetchWatchList(this.props.user.id));
  }

  render() {
    const actions = [
      <FlatButton
        label="Yes, Please"
        primary={true}
        onTouchTap={() => {
          this.watchAuction();
          this.closeWatchModal();
        }}
      />,
      <FlatButton
        label="Never Mind"
        primary={true}
        onTouchTap={this.closeWatchModal}
      />,
    ];

    return (
      <div>
        You are viewing an auction for {this.props.activeAuction.numTickets} ticket(s) to {this.props.activeAuction.eventName} priced at {this.props.activeAuction.currentPrice}.
        <button onClick={this.buyTickets}>Buy Tickets</button>
        <button onClick={this.openWatchModal}>Watch Auction</button>
        <Dialog
          actions={actions}
          open={this.state.open}
          onRequestClose={this.closeWatchModal}
        >
          Add this auction to your watchlist?
        </Dialog>
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
  return bindActionCreators({ buyTickets, fetchAuctionById, watchAuction, fetchWatchList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionDetails);
