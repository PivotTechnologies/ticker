import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import  ScriptjsLoader from 'react-google-maps/lib/async/ScriptjsLoader';
import moment from 'moment';
import { browserHistory } from 'react-router';
import { getLocation, selectEvent, fetchAuctions } from '../actions/index';


class Maps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userLat: this.props.userLocation.latitude,
      userLong: this.props.userLocation.longitude,
      mapLoaded: false,
    };

    this.handleMarkerClick = this.handleMarkerClick.bind(this);
  }

  // componentWillMount() {
  //   // console.log("user location before mount", this.props.userLocation);
  //   // console.log("this.props.event[0]:", this.props.events[0]);
  //
  //   console.log("this.state:", this.state);
  // }

  componentWillMount() {
    if (!this.props.userLocation) {
      this.props.getLocation();
    } else {
      this.setState({
        mapLoaded: true
      });
    }
  }
// } else {
//   if (!this.state.userLat) {
//     this.setState({
//       userLat: this.props.events[0].latitude,
//       userLong: this.props.events[0].longitude,
//       mapLoaded: true,
//     });
//   }
// }
  handleMarkerClick(marker) {
    console.log("inside handle marker click");
    console.log("marker", marker);

    this.props.selectEvent(marker);
    this.props.fetchAuctions(marker.id);
    browserHistory.push(`/event/${marker.id}`);
  }

  render() {

    const loading = 'https://thomas.vanhoutte.be/miniblog/wp-content/uploads/light_blue_material_design_loading.gif';
		const spinnerStyle = {
			marginLeft: '40%',
			marginTop: '15%'
		};

    if (!this.state.mapLoaded) {
      return (<div>
						    <img style={ spinnerStyle } src={ loading } />
					   </div>);
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
          height: "920px",
          width: "920px",
        }}/>
      }
      googleMapElement={
        <GoogleMap
          ref={(map) => {
            if(map === null) {
              return <div> Loading </div>
            }
            console.log("map:", map);
          }}
          defaultZoom={13}
          defaultCenter={{lat: +this.state.userLat, lng: +this.state.userLong}}
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getLocation, selectEvent, fetchAuctions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Maps);
