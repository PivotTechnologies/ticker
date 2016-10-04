import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';


export default function (MapComponent) {
  class MapsLoader extends React.Component {
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
