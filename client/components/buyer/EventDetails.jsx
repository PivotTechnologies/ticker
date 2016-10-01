import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import moment from 'moment';

const EventDetails = ({ activeEvent }) => {
  return (
    <div className="event-details">
      <Card>
        <CardMedia>
          <img src={activeEvent.image} />
        </CardMedia>
      </Card>
      <Card style={{flex: '1'}}>
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
                  {moment(activeEvent.datetime_local).format('MMMM Do, YYYY')}
                </div>
                <div>
                  {moment(activeEvent.datetime_local).format('h:mma')}
                </div>
              </div>
            </div>
          }
        />
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
