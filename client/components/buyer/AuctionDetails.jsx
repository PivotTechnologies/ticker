import React from 'react';
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buyTickets, fetchAuctionById, checkout, getClientToken, watchAuction, fetchWatchList } from '../../actions/index';
import { browserHistory } from 'react-router';
import braintree from 'braintree-web';

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

  componentWillMount() {
    console.log('mounting -> ', this.props.auctionId);
    if (!this.props.activeAuction || this.props.activeAuction.id !== this.props.auctionId) {
      this.props.fetchAuctionById(this.props.auctionId)
        .then( () => {
          this.setState({ amount: this.props.activeAuction.currentPrice });
        });
    }
  }

  componentDidMount() {
    const id = setInterval(() => {
      console.log('updating active auction!')
      this.props.fetchAuctionById(this.props.activeAuction.id)
        .then( () => {
          this.setState({ amount: this.props.activeAuction.currentPrice });
        });
    }, 1000);
    this.setState({ intervalId: id });

    // this.props.getClientToken().then( () => {
    //     //console.log('this.props.payment', this.props.payment);
    //     braintree.setup(this.props.paymentToken, 'custom', {
    //       paypal: {
    //         container: 'dropin-container',
    //         singleUse: true,
    //         amount: this.state.amount,
    //         currency: 'USD',
    //         locale: 'en_us'
    //       },
    //       onPaymentMethodReceived: (payment) => {
    //         console.log('payment = ', payment);
    //         //this.props.isLoading = true;
    //         this.props.checkout(payment, this.state.amount).then( (result) => {
    //           console.log('/checkout -> then() ', result);
    //           if(result.payload.status === 200){
    //               //this.props.isLoading = false;
    //           }
    //         });
    //       }
    //     });
    //   })
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
    if (localStorage.getItem('token')) {
      browserHistory.push('/buyerForm');
    } else {
      browserHistory.push('/signin');
    }
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
    if (typeof this.props.activeAuction === 'string') {
      return (
        <div>{this.props.activeAuction}</div>
      );
    }

    if (this.props.activeAuction && this.props.activeAuction.id == this.props.auctionId) {
      if (this.props.activeAuction.status !== 'On Sale') {
        return (
          <div>This auction is no longer active.</div>
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
        <div>
          You are viewing an auction for {this.props.activeAuction.numTickets} ticket(s) to {this.props.activeAuction.eventName} priced at {this.props.activeAuction.currentPrice}.
          <button onClick={this.buyTickets}>Buy Tickets</button>
          <button onClick={this.openWatchModal}>Watch Auction</button>
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

    return (
      <div className="spinner">
        <LinearProgress
          style={{ height: '10px' }}
          mode="indeterminate"
          />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    activeAuction: state.activeAuction,
    paymentToken: state.paymentToken,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ buyTickets, fetchAuctionById, checkout, getClientToken, watchAuction, fetchWatchList  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionDetails);
