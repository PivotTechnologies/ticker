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

    return <div />;
  }

  render() {
    // if (!this.props.userlocation) {
    //   return <div>Map not found</div>
    // }

    return (
//NEED TO ADD spinner
//AND MAYBE AND LIST/MAP VIEW

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
    height: "75%",
    width: "50%",
    // position: "absolute"
  }}/>
}
googleMapElement={
  <GoogleMap
  ref={(map) => {
    // setTimeout(() => {
    //   if (!map) {
    //     return;
    //   }
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
// lat: this.props.userlocation.latitude, lng: this.props.userlocation.longitude
function mapStateToProps(state) {
  return {
    events: state.events,
    userLocation: state.userLocation,
    isLoading: state.isLoading,
  };
}

export default connect(mapStateToProps)(Maps);




{/* <GoogleMapLoader
query={{ libraries: "geometry,drawing,places" }}

loadingElement={
  <div>Loading....</div>
}

containerElement={
  <div
  {...this.props.containerElementProps}
  style={{
    height: "100%",
    width: "100%",
    position: "absolute"
  }}
  />
}

googleMapElement={
  <GoogleMap
  ref={(map) => {
    setTimeout(() => {
      if (!map) {
        return;
      }
      console.log("map:", map);
    }, 5);
    //console.log(map)
  }}
  defaultZoom={15}
  defaultCenter={{ lat: +this.props.userLocation.latitude, lng: +this.props.userLocation.longitude }}
  >
  </GoogleMap>
}
/> */}
