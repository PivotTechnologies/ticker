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

    // this.state = {
    //   latitude: 39.095499,
    //   longitude: -98.705225,
    //   zoom: 4,
    // };

    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    //this.handleDefaultCenterZoom = this.handleDefaultCenterZoom.bind(this);
    // this.onZoomChange = this.onZoomChange.bind(this);
  }

  componentWillMount() {
    this.props.getLocation();
    this.props.searchEvents(null, null, "CA");
    // this.handleDefaultCenterZoom();
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

  // handleDefaultCenterZoom() {
  //   if (this.props.activeMarker.latitude) {
  //     this.setState({
  //       latitude: +this.props.activeMarker.latitude,
  //       longitude: +this.props.activeMarker.longitude,
  //       zoom: 11,
  //     });
  //   }  else if (this.props.userLocation.latitude) {
  //     this.setState({
  //       latitude: +this.props.userLocation.latitude,
  //       longitude: +this.props.userLocation.longitude,
  //       zoom: 11,
  //     });
  //   }
  // }

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
    // if (!this.props.userLocation.latitude) {
    //   return
    //   <div>
    //     <img style={ spinnerStyle } src={ loading } />
    //   </div>;
    // }

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
            defaultCenter={{ lat: +34.0522, lng: +-118.2437 }}
            defaultOptions={{
              styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
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
    // activeMarker: state.activeMarker,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getLocation, selectEvent, fetchAuctions, selectMarker, searchEvents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Maps);
