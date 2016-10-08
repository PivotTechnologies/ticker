import React from 'react';
import { connect } from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import EventListItem from './EventListItem.jsx';
import { bindActionCreators } from 'redux';
import Maps from './Maps.jsx';
import { getLocation } from '../../actions/index';

class EventList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  renderEventList() {
    if (this.props.events) {
      console.log("inside renderEventList:", this.props.events);
      return (
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab label="Events" value="a" >
            <div className="list">
            {this.props.events.map((event, idx) => {return <EventListItem key={idx} event={event} />})}
            </div>
          </Tab>
          <Tab label="Map" value="b">
            <div className="map">
              <Maps />
            </div>
          </Tab>
        </Tabs>
      );
    } else {
      return (
        <div>No events match this search.</div>
      );
    }
  }

  handleChange(value) {
    this.setState({
      value: value,
    });
  }

  render() {
    return (
      <div className="list">
        { this.renderEventList() }
      </div>
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
  return bindActionCreators({ getLocation }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(EventList);
