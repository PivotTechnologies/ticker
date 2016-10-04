import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

function MapsLoader(MapComponent) {
  return class extends React.Component {
    // some load logic
    render() {
      if (this.state.isLoaded) {
        return <MapComponent {...props } />
      }
      else {
        return null;
      }
    }
  }
}
