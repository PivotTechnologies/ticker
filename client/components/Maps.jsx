import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { GoogleMap, Marker, GoogleMapLoader  } from 'react-google-maps';
import { ScriptjsLoader } from 'react-google-maps/lib/async/ScriptjsLoader';

class Maps extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <ScriptjsLoader
        className="GoogleMap"
        hostname={"maps.googleapis.com"}
        pathname={"/maps/api/js"}
        query={{ key: "AIzaSyD_aFRTN7kGiUwefzVelUXLLMfhlXlpPvQ", libraries: "geometry,drawing,places" }}

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
            ref={(map) => console.log(map)}
            defaultZoom={5}
            defaultCenter={{ lat: this.props.location.latitude, lng: this.props.location.longitude }}
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
    location: state.userlocation,
  };
}

export default connect(mapStateToProps)(Maps);
