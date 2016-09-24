import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { selectEvent } from '../../actions/index';

class SellerEventListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.selectEvent(this.props.event);
    browserHistory.push('/sell/form');
  }

  render() {
    return (
      <div className="list-item" onClick={this.handleClick}>
        <p> Name: { this.props.event.name } </p>
        <p> Date: { this.props.event.datetime_local }, &nbsp;
          Timezone: { this.props.event.timezone } </p>
        <p> Venue: { this.props.event.venue } </p>
        <p> Address: { this.props.event.address }, &nbsp;
          { this.props.event.city }, &nbsp;
          {this.props.event.state } &nbsp;
          {this.props.event.zip }
        </p>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectEvent }, dispatch);
}

export default connect(null, mapDispatchToProps)(SellerEventListItem);
