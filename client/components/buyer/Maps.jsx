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
    this.renderIcon = this.renderIcon.bind(this);
  }

  componentWillMount() {
    this.handleDefaultCenterZoom();
  }

  handleDefaultCenterZoom() {
    if (this.props.activeMarker.latitude) {
      this.setState({
        latitude: +this.props.activeMarker.latitude,
        longitude: +this.props.activeMarker.longitude,
        zoom: 11,
      });
    }
    else if (this.props.userLocation.latitude) {
      this.setState({
        latitude: +this.props.userLocation.latitude,
        longitude: +this.props.userLocation.longitude,
        zoom: 11,
      });
    }
  }

  handleMarkerClick(marker) {
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
        return '../../assets/images/sportsMarkerDark.png';

      case 'concert':
        return '../../assets/images/musicMarkerDark.png';

      case 'theater':
        return '../../assets/images/theaterMarkerDark.png';

      default:
        return 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
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
        hostname={'maps.googleapis.com'}
        pathname={'/maps/api/js'}
        query={{ key: 'AIzaSyD_aFRTN7kGiUwefzVelUXLLMfhlXlpPvQ', libraries: 'geometry,drawing,places'}}

        loadingElement={
          <div>
            <img style={spinnerStyle} src={loading} />
          </div>
        }

      containerElement={
        <div
        style={{
          display: 'flex',
          height: '600px',
          width: '920px',
        }} />
      }

      googleMapElement={
        <GoogleMap
          ref={(map) => { console.log("map:", map);}}

          defaultZoom={this.state.zoom}
          defaultCenter={{ lat: +this.state.latitude,
              lng: +this.state.longitude,
          }}
          defaultOptions={{
          styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"simplified"},{"saturation":"-65"},{"lightness":"45"},{"gamma":"1.78"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway.controlled_access","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway.controlled_access","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway.controlled_access","elementType":"labels.icon","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"saturation":"-33"},{"lightness":"22"},{"gamma":"2.08"}]},{"featureType":"transit.station.airport","elementType":"geometry","stylers":[{"gamma":"2.08"},{"hue":"#ffa200"}]},{"featureType":"transit.station.airport","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.rail","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.rail","elementType":"labels.icon","stylers":[{"visibility":"simplified"},{"saturation":"-55"},{"lightness":"-2"},{"gamma":"1.88"},{"hue":"#ffab00"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#bbd9e5"},{"visibility":"simplified"}]}]
        }}
          >
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
