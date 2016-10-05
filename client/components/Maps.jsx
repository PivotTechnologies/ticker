import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import { GoogleMap, Marker, GoogleMapLoader  } from 'react-google-maps';
import  ScriptjsLoader from 'react-google-maps/lib/async/ScriptjsLoader';
import LinearProgress from 'material-ui/LinearProgress';

class Maps extends React.Component {
  constructor(props) {
    super(props);

  }
  // componentWillMount() {
  //   if (this.props.userLocation) {
  //     console.log(this.props.userLocation);
  //   }
  // }
  // className="GoogleMap"
  // hostname={"maps.googleapis.com"}
  // pathname={"/maps/api/js"}
  // query={{ key: "AIzaSyD_aFRTN7kGiUwefzVelUXLLMfhlXlpPvQ", libraries: "geometry,drawing,places" }}
  renderSpinner() {
    if (this.props.isLoading) {
      return (
        <div className="spinner">
          <LinearProgress
            style={{ height: '10px' }}
            mode="indeterminate"
          />
        </div>
      );
    }
  }

  render() {
    return (

    <ScriptjsLoader
      hostname={"maps.googleapis.com"}
      pathname={"/maps/api/js"}
      query={{ key: "AIzaSyD_aFRTN7kGiUwefzVelUXLLMfhlXlpPvQ", libraries: "geometry,drawing,places"}}

      loadingElement={
        <div>
          {this.renderSpinner()}
        </div>
      }

      containerElement={
        <div
        style={{
          height: "920px",
          width: "920px",
        }}/>
      }
      googleMapElement={
        <GoogleMap
          ref={(map) => {
            // setTimeout(() => {
            //   if (!map) {
            //     return;
            //   }
            if (!map) {
              {this.renderSpinner()}
            }
              console.log("map:", map);}}
            // }, 5);}}
            defaultZoom={15}
            defaultCenter={{lat: +this.props.userLocation.latitude, lng: +this.props.userLocation.longitude}}
          >
        </GoogleMap>
      }
    />
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.events,
    userLocation: state.userLocation,
    isLoading: state.isLoading,
  };
}

export default connect(mapStateToProps)(Maps);
