import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buyTickets, getClientToken, fetchAuctionById, checkout } from '../../actions/index';
import { browserHistory } from 'react-router';
import braintree from 'braintree-web';

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
        })
      })
  }

  componentWillUnmount() {
    console.log('no longer updating active auction')
    clearInterval(this.state.intervalId);
  }

  render() {
      return (
        <div className="auction-view">
          <p>Continue to PayPal to complete the checkout process:</p>
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
