import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import  ScriptjsLoader from 'react-google-maps/lib/async/ScriptjsLoader';
import LinearProgress from 'material-ui/LinearProgress';
import moment from 'moment';
import { getLocation } from '../actions/index';

class Maps extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   markers: [],
    // }
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
  }

  componentWillMount() {
    // console.log("user location before mount", this.props.userLocation);
    if (!this.props.userLocation) {
      this.props.getLocation();
    }
  }

  handleMarkerClick() {
    console.log("inside handle marker click");
    return
      (<InfoWindow
        title="hello eugene"
        // onCloseClick={.noop}
        // onDomReady={.noop}
        // onZIndexChanged={.noop}
      />
    );
  }

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
          display: "flex",
          height: "920px",
          width: "920px",
        }}/>
      }
      googleMapElement={
        <GoogleMap
          ref={(map) => {
            console.log("map:", map);
            // if (!map) {
            //   return;
            // }
          }}
          defaultZoom={14}
          defaultCenter={{lat: +this.props.userLocation.latitude, lng: +this.props.userLocation.longitude}}
          >
          <Marker
            position={{lat: +this.props.userLocation.latitude, lng: +this.props.userLocation.longitude}}
            title="User Location"
            icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
          />
            {this.props.events.map((event) => {
              return (
                <Marker
                  position={{lat: +event.latitude, lng: +event.longitude}}
                  key={event.id}
                  title={event.name + '\n' + moment(event.eventDate).format('MMMM Do, YYYY [@] h:mma') + '\n' + 'Open Auctions: ' + event.numAuctions}
                  icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                  onClick={this.handleMarkerClick}
                >
                  {event.showInfo && (
                  <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
                    <div>{event.infoContent}</div>
                  </InfoWindow>
                  )}
                </Marker>
              );
            })}
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getLocation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Maps);
