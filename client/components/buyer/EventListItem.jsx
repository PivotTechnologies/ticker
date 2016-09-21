import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { selectEvent, fetchAuctions } from '../../actions/index';

class EventListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.selectEvent(this.props.event);
    this.props.fetchAuctions(this.props.event.id);
    browserHistory.push(`/event/${this.props.event.id}`);
  }

  render() {
    return (
      <div className="list-item" onClick={this.handleClick}>
        <p> Name: { this.props.event.name } </p>
        <p> Date: { this.props.event.date } </p>
        <p> Time: { this.props.event.time } </p>
        <p> Venue: { this.props.event.venue } </p>
        <p> City: { this.props.event.city } </p>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectEvent, fetchAuctions }, dispatch);
}

export default connect(null, mapDispatchToProps)(EventListItem);
