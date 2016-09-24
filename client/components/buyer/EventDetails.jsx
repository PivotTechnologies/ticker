import React from 'react';
import { connect } from 'react-redux';

const EventDetails = ({ activeEvent }) => {
  return (
    <div>
      You are viewing the event: {activeEvent.name}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    activeEvent: state.activeEvent,
  };
}

export default connect(mapStateToProps)(EventDetails);
