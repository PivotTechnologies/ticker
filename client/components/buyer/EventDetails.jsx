import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import moment from 'moment';

const EventDetails = ({ activeEvent }) => {
  return (
    <div className="event-details">
      <Card className="event-date" style={{height: '210px', width: '210px', background: '#E0E0E0'}}>
        <div className="event-details-month">
          {moment(activeEvent.eventDate).format('MMM').toUpperCase()}
        </div>
        <div className="event-details-day">
          {moment(activeEvent.eventDate).format('DD').toUpperCase()}
        </div>
        <div className="event-details-weekday">
          {moment(activeEvent.eventDate).format('ddd').toUpperCase()}
        </div>
      </Card>
      <Card style={{flex: '1', height: '210px'}}>
        <CardTitle
          title={activeEvent.name}
          subtitle={
            <div className="event-details-text">
              <div>
                <div>
                  {activeEvent.venue}
                </div>
                <div>
                  {activeEvent.address}
                </div>
                <div>
                  {activeEvent.city}, {activeEvent.state} {activeEvent.zip}
                </div>
              </div>
              <div>
                <div>
                  {moment(activeEvent.eventDate).format('MMMM Do, YYYY')}
                </div>
                <div>
                  {moment(activeEvent.eventDate).format('h:mma')}
                </div>
              </div>
            </div>
          }
        />
      </Card>
      <Card>
        <CardMedia>
          <img src={activeEvent.image} />
        </CardMedia>
      </Card>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    activeEvent: state.activeEvent,
  };
}

export default connect(mapStateToProps)(EventDetails);
