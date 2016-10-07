import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buyTickets, getClientToken, fetchAuctionById, checkout } from '../../actions/index';
import { browserHistory } from 'react-router';
import braintree from 'braintree-web';

import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';

class BuyerForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      intervalId: null,
    };

  }

  buyTickets() {
    this.props.buyTickets(this.props.user.id, this.props.activeAuction.id)
      .then(response => browserHistory.push('/confirm'));
  }

  componentWillMount() {
    const id = setInterval(() => {
      console.log('updating active auction!')
      this.props.fetchAuctionById(this.props.activeAuction.id)
    }, 1000);
    this.setState({ intervalId: id });

    this.props.getClientToken().then( () => {
        braintree.setup(this.props.paymentToken, 'custom', {
          paypal: {
            container: 'dropin-container',
            singleUse: true,
            amount: this.props.activeAuction.currentPrice,
            currency: 'USD',
            locale: 'en_us'
          },
          onPaymentMethodReceived: (payment) => {
            console.log('payment = ', payment);
            this.props.checkout(payment, this.props.activeAuction.currentPrice).then( (result) => {
              console.log('/checkout -> then() ', result);
              if(result.payload.status === 200){
                  console.log('success!!');
                  this.buyTickets();
              }
            });
          }
        });
      })
  }

  componentWillUnmount() {
    console.log('no longer updating active auction')
    clearInterval(this.state.intervalId);
  }

  render() {
      return (
        <div>
          <h1>Buyer Form</h1>
            You are buying {this.props.activeAuction.numTickets} ticket(s) to {this.props.activeAuction.eventName} priced at {this.props.activeAuction.currentPrice}.
          <form>
            <div id="dropin-container"></div>
          </form>
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
  return bindActionCreators({ buyTickets, checkout, getClientToken, fetchAuctionById }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerForm);
