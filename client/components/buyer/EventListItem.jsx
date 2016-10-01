import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
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
    browserHistory.push(`/event/${this.props.event.id}`);
  }

  renderPlural() {
    if (this.props.event.numAuctions > 1)
      return 's';
  }

  render() {
    return (
      <div className="event-details list-item" onClick={this.handleClick} >
        <Card className="event-date" style={{width: '130px'}}>
          <div>
            {moment(this.props.event.datetime_local).format('MMM').toUpperCase()}
          </div>
          <div className="event-date-day">
            {moment(this.props.event.datetime_local).format('DD').toUpperCase()}
          </div>
          <div>
            {moment(this.props.event.datetime_local).format('ddd').toUpperCase()}
          </div>
        </Card>
        <Card style={{flex: '1', position: 'relative'}}>
          <CardTitle
            title={this.props.event.name}
            subtitle={
              <div>
                <div>
                  {this.props.event.venue} - {this.props.event.city}, {this.props.event.state}
                </div>
                <div>
                  {moment(this.props.event.datetime_local).format('MMMM Do, YYYY [@] h:mma')}
                </div>
              </div>
            }
          />
          <Chip
            style={{position: 'absolute', top: '20px', right: '20px', cursor: 'pointer'}}
          >
            {this.props.event.numAuctions} Open Auction{this.renderPlural()}
          </Chip>
        </Card>
        <Card>
          <CardMedia style={{width: '175px'}}>
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
