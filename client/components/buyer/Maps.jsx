import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GoogleMap, Marker } from 'react-google-maps';
import ScriptjsLoader from 'react-google-maps/lib/async/ScriptjsLoader';
import moment from 'moment';
import { browserHistory } from 'react-router';
import { getLocation, selectEvent, fetchAuctions, selectMarker } from '../../actions/index';

class Maps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 39.095499,
      longitude: -98.705225,
      zoom: 4,

    };

    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleDefaultCenterZoom = this.handleDefaultCenterZoom.bind(this);
    // this.onZoomChange = this.onZoomChange.bind(this);
  }

  componentWillMount() {
    this.handleDefaultCenterZoom();
  }

  // componentWillUpdate() {
  //   console.log("this.state.zoom:", this.state.zoom);
  // }
  //
  // // onZoomChange(map) {
  //     // this.props.onZoomChange(this.ref.map.getZoom());
  //     console.log("inside of zoom changed", map.getZoom());
  //     // console.log("zoom leve:", map.getZoom());
  // }

  handleDefaultCenterZoom() {
    if (this.props.activeMarker.latitude) {
      this.setState({
        latitude: +this.props.activeMarker.latitude,
        longitude: +this.props.activeMarker.longitude,
        zoom: 11,
      });
    }  else if (this.props.userLocation.latitude) {
      this.setState({
        latitude: +this.props.userLocation.latitude,
        longitude: +this.props.userLocation.longitude,
        zoom: 11,
      });
    }
  }

  handleMarkerClick(marker) {
    console.log('marker.timezone', marker.timezone);
    if (marker.timezone) {
      this.props.selectMarker(marker);
    }
    this.props.selectEvent(marker);
    this.props.fetchAuctions(marker.id);
    browserHistory.push(`/event/${marker.id}/`);
  }

  renderIcon(marker) {
    switch(marker.category) {
      case 'sports':
        return 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

      case 'concert':
        return 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

      case 'theater':
        return 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'

      default:
          return 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    }
  }

  render() {

    const loading = 'https://thomas.vanhoutte.be/miniblog/wp-content/uploads/light_blue_material_design_loading.gif';
		const spinnerStyle = {
			marginLeft: '40%',
			marginTop: '15%',
		};

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
            }}
          />
        }

        googleMapElement={
          <GoogleMap
            ref={(map) => console.log("map:", map)}
            defaultZoom={this.state.zoom}
            defaultCenter={{ lat: +this.state.latitude, lng: +this.state.longitude }}
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
                  icon={ this.renderIcon(marker) }
                  onClick={() => this.handleMarkerClick(marker)}
                />
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
