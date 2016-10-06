import React from 'react';
import { connect } from 'react-redux';
import EventList from './EventList.jsx';

class EventsTabView extends React.Component {
  render() {
    if (!this.props.events.length) {
      return (<div></div>);
    }
      return (<EventList />);
    }
}



function mapStateToProps(state) {
  return {
    events: state.events,
  };
}

export default connect(mapStateToProps)(EventsTabView);
