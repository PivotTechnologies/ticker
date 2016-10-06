import React from 'react';
import { connect } from 'react-redux';
import EventList from './EventList.jsx';

class EventsTabView extends React.Component {
  render() {
    console.log("this.props.events in events tab view:", this.props.events);
    if (this.props.events && !this.props.events.length) {
      return (<div></div>);
    } else {
      return (<EventList />);
    }
    }
}



function mapStateToProps(state) {
  return {
    events: state.events,
  };
}

export default connect(mapStateToProps)(EventsTabView);
