import React from 'react';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserActivity, cancelAuction } from '../../actions/index';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.cancelAuction = this.cancelAuction.bind(this);
  }

  componentWillMount() {
    this.props.fetchUserActivity(this.props.user.id);
  }

  cancelAuction(auctionId) {
    this.props.cancelAuction(auctionId)
    .then(() => this.props.fetchUserActivity(this.props.user.id));

  }

  renderBuyerHistory() {
    if (!this.props.userActivity.buyerActivity.length) {
      return (
        <div>
          <h3>Upcoming Events:</h3>
          <span>You have not purchased tickets for any upcoming events.</span>
        </div>
      );
    }
    // ADD PAST EVENTS
    return (
      this.props.userActivity.buyerActivity.map(auction => (
        <div className="activity-item" key={auction.id}>
          <p>Number of Tickets: {auction.numTickets}</p>
          <p>Sale Price: {auction.currentPrice}</p>
        </div>
      ))
    );
  }

  renderCurrentlySelling() {
    if (!this.props.userActivity.sellerActivity.on_sale.length) {
      return (
        <div>
          <h3>Currently Selling:</h3>
          <span>You are not currently selling any tickets.</span>
        </div>
      );
    }

    return (
      <div>
        <h3>Currently Selling:</h3>
        {this.props.userActivity.sellerActivity.on_sale.map(auction => (
          <div className="activity-item" key={auction.id}>
            <p>Number of Tickets: {auction.numTickets}</p>
            <p>Sale Price: {auction.currentPrice}</p>
            <RaisedButton
              label="Cancel Auction"
              onClick={() => {
                this.cancelAuction(auction.id)
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  renderSold() {
    if (!this.props.userActivity.sellerActivity.sold.length) {
      return (
        <div>
          <h3>Sold:</h3>
          <span>You have not sold any tickets.</span>
        </div>
      );
    }

    return (
      <div>
        <h3>Sold:</h3>
        {this.props.userActivity.sellerActivity.sold.map(auction => (
          <div className="activity-item" key={auction.id}>
            <p>Number of Tickets: {auction.numTickets}</p>
            <p>Sale Price: {auction.currentPrice}</p>
          </div>
        ))}
      </div>
    );
  }

  renderExpired() {
    if (!this.props.userActivity.sellerActivity.expired.length) {
      return (
        <div>
          <h3>Expired:</h3>
          <span>You do not have any expired auctions.</span>
        </div>
      );
    }

    return (
      <div>
        <h3>Expired:</h3>
        {this.props.userActivity.sellerActivity.expired.map(auction => (
          <div className="activity-item" key={auction.id}>
            <p>Number of Tickets: {auction.numTickets}</p>
            <p>Sale Price: {auction.currentPrice}</p>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const tabStyle = {
      background: 'white',
      color: 'black',
    };
    const inkBarStyle = {
      background: 'black',
    };

    if (this.props.userActivity.buyerActivity) {
      return (
        <Paper zDepth={0} className="main-content">
          <h1>My Account</h1>
          <Paper zDepth={2} className="account-activity">
            <Tabs inkBarStyle={inkBarStyle}>
              <Tab style={tabStyle} label="Buyer History">
                {this.renderBuyerHistory()}
              </Tab>
              <Tab style={tabStyle} label="Seller History">
                {this.renderCurrentlySelling()}
                {this.renderSold()}
                {this.renderExpired()}
              </Tab>
            </Tabs>
          </Paper>
        </Paper>
      );
    }

    return <div />;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    userActivity: state.userActivity,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUserActivity, cancelAuction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
