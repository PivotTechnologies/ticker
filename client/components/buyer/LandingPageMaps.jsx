import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GoogleMap, Marker } from 'react-google-maps';
import ScriptjsLoader from 'react-google-maps/lib/async/ScriptjsLoader';
import moment from 'moment';
import { browserHistory } from 'react-router';
import { getLocation, selectEvent, fetchAuctions, selectMarker, searchEvents } from '../../actions/index';

class Maps extends React.Component {
  constructor(props) {
    super(props);

    this.handleMarkerClick = this.handleMarkerClick.bind(this);
  }

  componentWillMount() {
    this.props.getLocation();
    this.props.searchEvents(null, null, "CA");
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
        return '../../assets/images/sportsMarker.png';

      case 'concert':
        return '../../assets/images/musicMarker.png';

      case 'theater':
        return '../../assets/images/theaterMarker.png';

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
    const zoomOptions = [{
      "draggable": "false",
      "zoomControl": "false",
      "scrollWheel": "false",
    }]
    return (
      <ScriptjsLoader
        hostname={"maps.googleapis.com"}
        pathname={"/maps/api/js"}
        query={{ key: "AIzaSyD_aFRTN7kGiUwefzVelUXLLMfhlXlpPvQ", libraries: "geometry,drawing,places"}}

        loadingElement={
          <div>

          </div>
        }

        containerElement={
          <div
            style={{
              display: "flex",
              height: "600px",
              width: "100%",
            }}
          />
        }

        googleMapElement={
          <GoogleMap
            ref={(map) => console.log("map:", map)}
            defaultZoom={12}
            defaultCenter={{ lat: +34.050493, lng: +-118.331629 }}
            defaultOptions={{
              scrollwheel: false,
              styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}],
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getLocation, selectEvent, fetchAuctions, selectMarker, searchEvents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Maps);
