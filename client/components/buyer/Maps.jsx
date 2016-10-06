import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GoogleMap, Marker } from 'react-google-maps';
import ScriptjsLoader from 'react-google-maps/lib/async/ScriptjsLoader';
import moment from 'moment';
import { browserHistory } from 'react-router';
//import { CircularProgress } from 'material-ui/CircularProgress';
import { getLocation, selectEvent, fetchAuctions, selectMarker } from '../../actions/index';


class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
  }
  componentWillUpdate() {
    console.log('activemarker:', this.props.activeMarker);
  }
  handleMarkerClick(marker) {
    console.log('marker.id', marker.id);
    if (marker.id) {
      this.props.selectMarker(marker);
    }
    this.props.selectEvent(marker);
    this.props.fetchAuctions(marker.id);
    browserHistory.push(`/event/${marker.id}`);
  }

  render() {

    const loading = 'https://thomas.vanhoutte.be/miniblog/wp-content/uploads/light_blue_material_design_loading.gif';
		const spinnerStyle = {
			marginLeft: '40%',
			marginTop: '15%',
		};

    if (!this.props.userLocation.latitude && !this.props.userLocation.longitude) {
      return  (<div>
      			    <img style={ spinnerStyle } src={ loading } />
      		   </div>)
    }

    return (
      <ScriptjsLoader
        hostname={"maps.googleapis.com"}
        pathname={"/maps/api/js"}

        query={{ key: "AIzaSyD_aFRTN7kGiUwefzVelUXLLMfhlXlpPvQ", libraries: "geometry,drawing,places"}}

        loadingElement={
          <div>
          <img style={ spinnerStyle } src={ loading } />
          </div>
        }

      containerElement={
        <div
        style={{
          display: "flex",
          height: "30em",
          width: "920px",
        }}/>
      }

      googleMapElement={
        <GoogleMap
          ref={(map) => {
            console.log("map:", map);
          }}
          defaultZoom={12}
          defaultCenter={
            { lat: (!this.props.activeMarker.latitude ?  +this.props.userLocation.latitude : +this.props.activeMarker.latitude),
              lng: (!this.props.activeMarker.longitude ?  +this.props.userLocation.longitude : +this.props.activeMarker.longitude),
            }
          }
          >

          <Marker
            position={{lat: +this.props.userLocation.latitude, lng: +this.props.userLocation.longitude}}
            title="User Location"
            icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
          />
            {this.props.events.map((marker) => {
              return (
                <Marker
                  position={{lat: +marker.latitude, lng: +marker.longitude}}
                  key={marker.id}
                  title={marker.name + '\n' + moment(marker.eventDate).format('MMMM Do, YYYY [@] h:mma') + '\n' + 'Open Auctions: ' + marker.numAuctions}
                  icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                  onClick={() => this.handleMarkerClick(marker)}
                >
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
    activeMarker: state.activeMarker,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getLocation, selectEvent, fetchAuctions, selectMarker }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Maps);
