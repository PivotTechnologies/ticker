import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import ActionGavel from 'material-ui/svg-icons/action/gavel';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { selectEvent, fetchAuctions } from '../../actions/index';

class EventListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.renderPlural = this.renderPlural.bind(this);
  }

  handleClick() {
    this.props.selectEvent(this.props.event);
    this.props.fetchAuctions(this.props.event.id);
    browserHistory.push(`/event/${this.props.event.id}/`);
  }

  renderPlural() {
    if (this.props.event.numAuctions > 1) {
      return 's';
    }
    return '';
  }

  render() {
    return (
      <div className="event-list-item list-item" onClick={this.handleClick} >
        <Card className="event-date" style={{width: '125px', background: '#E0E0E0'}}>
          <div>
            {moment(this.props.event.eventDate).format('MMM').toUpperCase()}
          </div>
          <div className="event-date-day">
            {moment(this.props.event.eventDate).format('DD').toUpperCase()}
          </div>
          <div>
            {moment(this.props.event.eventDate).format('ddd').toUpperCase()}
          </div>
        </Card>
        <Card style={{flex: '1', position: 'relative', maxHeight: '150px'}}>
          <CardTitle
            title={this.props.event.name}
            subtitle={
              <div>
                <div className="event-p">
                  {this.props.event.venue} - {this.props.event.city}, {this.props.event.state}
                </div>
                <div className="event-p">
                  {moment(this.props.event.eventDate).format('MMMM Do, YYYY [@] h:mma')}
                </div>
              </div>
            }
          />
          <Chip
            style={{position: 'absolute', bottom: '20px', right: '20px', cursor: 'pointer'}}
          >
            <Avatar icon={<ActionGavel />} />
            {this.props.event.numAuctions} Open Auction{this.renderPlural()}
          </Chip>
        </Card>
        <Card>
          <CardMedia style={{width: '200px'}}>
            <img src={this.props.event.image} />
          </CardMedia>
        </Card>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectEvent, fetchAuctions }, dispatch);
}

export default connect(null, mapDispatchToProps)(EventListItem);
