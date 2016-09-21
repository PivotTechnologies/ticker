import React from 'react';
import { connect } from 'react-redux';

const UserProfile = ({ userActivity }) => {
  if (userActivity) { // won't need this if when we use react router!!
    return (
      <div>
        <h1>My Account</h1>
        <h3>Buyer History</h3>
        {userActivity.buyerHistory.map(auction => (<p key={auction}>{auction}</p>))}
        <h3>Seller History</h3>
        {userActivity.sellerHistory.map(auction => (<p key={auction}>{auction}</p>))}
      </div>
    );
  }

  return <div />;
};

function mapStateToProps(state) {
  return {
    userActivity: state.userActivity,
  };
}

export default connect(mapStateToProps)(UserProfile);
