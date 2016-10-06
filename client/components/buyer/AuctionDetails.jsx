import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buyTickets, fetchAuctionById, checkout, getClientToken } from '../../actions/index';
import { browserHistory } from 'react-router';
import braintree from 'braintree-web';

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

    const amount = this.props.activeAuction.currentPrice;
    this.props.getClientToken().then( () => {
        //console.log('this.props.payment', this.props.payment);
        braintree.setup(this.props.paymentToken, 'custom', {
          paypal: {
            container: 'dropin-container',
            singleUse: true,
            amount: amount,
            currency: 'USD',
            locale: 'en_us'
          },
          onPaymentMethodReceived: (payment) => {
            console.log('payment = ', payment);
            this.props.isLoading = true;
            this.props.checkout(payment, amount).then( (result) => {
              console.log('/checkout -> then() ', result);
              if(result.payload.status === 200){
                  this.props.isLoading = false;
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

  buyTickets() {

    this.props.buyTickets(this.props.user.id, this.props.activeAuction.id)
      .then(response => browserHistory.push('/confirm'));

  }

  render() {
    return (
      <div>
        You are viewing an auction for {this.props.activeAuction.numTickets} ticket(s) to {this.props.activeAuction.eventName} priced at {this.props.activeAuction.currentPrice}.
        <button onClick={this.buyTickets}>Buy Tickets</button>
        <form>
            <div id="">
              <div id="dropin-container"></div>
            </div>

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
  return bindActionCreators({ buyTickets, fetchAuctionById, checkout, getClientToken }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionDetails);
