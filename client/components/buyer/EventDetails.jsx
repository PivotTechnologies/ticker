import React from 'react';
import { connect } from 'react-redux';

const EventDetails = ({ activeEvent }) => {
  if (activeEvent) { // won't need this if when we use react router!!
    return (
      <div>
        You are viewing the event: {activeEvent.name}
      </div>
    );
  }

  return <div></div>;
};

function mapStateToProps(state) {
  return {
    activeEvent: state.activeEvent,
  };
}

export default connect(mapStateToProps)(EventDetails);
