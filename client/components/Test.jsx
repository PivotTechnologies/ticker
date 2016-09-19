import React from 'react';
import { connect } from 'react-redux';

const Test = () => <div>this.props</div>;

function mapStateToProps(state) {
  return {
    event: state.activeEvent,
  };
}

export default connect(mapStateToProps)(Test);
