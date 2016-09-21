import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectEvent, fetchAuctions } from '../../actions/index';

class EventListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.selectEvent(this.props.event);
    this.props.fetchAuctions(this.props.event.id);
  }

  render() {
    return (
      //<a href=`/event/${this.props.event.id.toString()}` onClick={this.handleClick}>
        <div className="list-item">
          <p> Name: { this.props.event.name } </p>
          <p> Date/Time: { this.props.event.datetime } </p>
          <p> Venue: { this.props.event.venue } </p>
          <p> City: { this.props.event.city } </p>
        </div>
      //</a>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectEvent, fetchAuctions }, dispatch);
}

export default connect(null, mapDispatchToProps)(EventListItem);
