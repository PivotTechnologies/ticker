import React from 'react';
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { watchAuction, fetchWatchList } from '../../actions/index';
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
    this.renderPlural = this.renderPlural.bind(this);
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
    browserHistory.push(
      `/event/${this.props.params.eventId}/auction/${this.props.params.auctionId}/buyerForm`
    );
  }

  openWatchModal() {
    this.setState({ open: true });
  }

  closeWatchModal() {
    this.setState({ open: false });
  }

  watchAuction() {
    this.props.watchAuction(this.props.user.id, this.props.activeAuction.id, this.props.params.eventId)
      .then(response => this.props.fetchWatchList(this.props.user.id));
  }

  renderPlural() {
    if (this.props.activeAuction.numTickets > 1){
      return 's';
    }
    return '';
  }

  render() {
    if (typeof this.props.activeAuction === 'string') {
      return (
        <div className="auction-view">{this.props.activeAuction}</div>
      );
    }

    if (this.props.activeAuction.status !== 'On Sale') {
      return (
        <div className="auction-view">This auction is no longer active.</div>
      );
    }

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
      <div className="auction-view">
        <h1>{this.props.activeAuction.numTickets} Ticket{this.renderPlural()} for ${this.props.activeAuction.currentPrice}</h1>
        <div className="buy-tickets-container">
          <div>Grab these tickets now before it's too late!</div>
          <RaisedButton label="Buy Tickets" onClick={this.buyTickets} style={{margin: '10px'}} />
        </div>
        <div className="watch-auction-container">
          <div>Waiting for a lower price? <br /> Keep tabs on this auction by adding it to your Watch List.</div>
          <RaisedButton label="Watch Auction" onClick={this.openWatchModal} style={{margin: '10px'}} />
        </div>
        <Dialog
          actions={actions}
          open={this.state.open}
          onRequestClose={this.closeWatchModal}
          >
          Add this auction to your Watch List?
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
  return bindActionCreators({ watchAuction, fetchWatchList  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionDetails);
