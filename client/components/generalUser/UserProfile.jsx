import React from 'react';
import { connect } from 'react-redux';

const UserProfile = ({ userActivity }) => {
  if (userActivity) { // won't need this if when we use react router!!
    return (
      <div>
        You are viewing the profile of user: {userActivity.userID}
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
