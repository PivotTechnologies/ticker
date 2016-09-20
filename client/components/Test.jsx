import React from 'react';
import { connect } from 'react-redux';

const Test = props => <div>{props.event}</div>;

function mapStateToProps(state) {
  return {
    event: state.activeEvent,
  };
}

export default connect(mapStateToProps)(Test);
