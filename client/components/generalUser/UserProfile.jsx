import React from 'react';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserActivity } from '../../actions/index';

class UserProfile extends React.Component {
  componentWillMount() {
    this.props.fetchUserActivity(this.props.user.id);
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
        <div>
          <h1>My Account</h1>
          <Paper zDepth={2}>
            <Tabs inkBarStyle={inkBarStyle}>
              <Tab style={tabStyle} label="Buyer History">
                {this.props.userActivity.buyerActivity.map(auction => (
                  <div className="activity-item" key={auction.id}>
                    <p>Number of Tickets: {auction.numTickets}</p>
                    <p>Sale Price: {auction.currentPrice}</p>
                  </div>
                ))}
              </Tab>
              <Tab style={tabStyle} label="Seller History">
                <h3>Currently Selling:</h3>
                {this.props.userActivity.sellerActivity.on_sale.map(auction => (
                  <div className="activity-item" key={auction.id}>
                    <p>Number of Tickets: {auction.numTickets}</p>
                    <p>Sale Price: {auction.currentPrice}</p>
                  </div>
                ))}

                <h3>Sold:</h3>
                {this.props.userActivity.sellerActivity.sold.map(auction => (
                  <div className="activity-item" key={auction.id}>
                    <p>Number of Tickets: {auction.numTickets}</p>
                    <p>Sale Price: {auction.currentPrice}</p>
                  </div>
                ))}
                <h3>Expired:</h3>
                {this.props.userActivity.sellerActivity.expired.map(auction => (
                  <div className="activity-item" key={auction.id}>
                    <p>Number of Tickets: {auction.numTickets}</p>
                    <p>Sale Price: {auction.currentPrice}</p>
                  </div>
                ))}
              </Tab>
            </Tabs>
          </Paper>
        </div>
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
  return bindActionCreators({ fetchUserActivity }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
