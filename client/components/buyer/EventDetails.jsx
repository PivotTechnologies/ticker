import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import moment from 'moment';

 class EventDetails extends React.Component {
   constructor (props) {
     super(props)

     this.renderEventImage = this.renderEventImage.bind(this);
   }

  renderEventImage(event) {
    console.log("event images:", event.image);
    if(event.image) {
      return event.image;
    }
      switch(event.category) {
        case 'sports':
          return '../../assets/images/sportsEvent.png';

        case 'concert':
          return '../../assets/images/musicEvent.png';

        case 'theater':
          return '../../assets/images/theaterEvent.png';
      }
  };

  render() {
    const activeEvent = this.props.activeEvent;

    return (
      <div className="event-details">
        <Card className="event-date" style={{height: '210px', width: '210px', background: '#2a2c43', color: '#f2b632', borderRadius: '8px 0px 0px 8px'}}>
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
                  <br />
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
                <br />
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
        <Card style={{ borderRadius: '0px 8px 8px 0px' }}>
          <CardMedia>
            <img className="event-list-item-image" src={this.renderEventImage(activeEvent)} />
          </CardMedia>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeEvent: state.activeEvent,
  };
}

export default connect(mapStateToProps)(EventDetails);
