import React from 'react';
import { connect } from 'react-redux';
import EventListItem from './EventListItem.jsx';

class EventList extends React.Component {
  renderEventList() {
    return this.props.events.map((event, idx) =>
      <EventListItem key={idx} event={event} />
    );
  }

  render() {
    return (
      <div>
        { this.renderEventList() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.events,
  };
}

export default connect(mapStateToProps)(EventList);
