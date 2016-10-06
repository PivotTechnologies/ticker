import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
<<<<<<< HEAD
=======
import { browserHistory } from 'react-router';
>>>>>>> feature/Maps
import moment from 'moment';

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    browserHistory.push(`/`);
  }

  render(){
  return (
    <div className="event-details">
      <Card>
        <CardMedia>
<<<<<<< HEAD
          <img src={activeEvent.image} />
        </CardMedia>
      </Card>
      <Card style={{flex: '1'}}>
        <CardTitle
          title={activeEvent.name}
=======
          <img src={this.props.activeEvent.image} />
        </CardMedia>

      </Card>
      <Card style={{flex: '1'}}>
        <CardTitle
          title={this.props.activeEvent.name}
>>>>>>> feature/Maps
          subtitle={
            <div className="event-details-text">
              <div>
                <div>
<<<<<<< HEAD
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
=======
                  {this.props.activeEvent.venue}
                </div>
                <div>
                  {this.props.activeEvent.address}
                </div>
                <div>
                  {this.props.activeEvent.city}, {this.props.activeEvent.state} {this.props.activeEvent.zip}
                </div>
              </div>
              <div>
              <div>
                  {moment(this.props.activeEvent.eventDate).format('MMMM Do, YYYY')}
                </div>
                <div>
                  {moment(this.props.activeEvent.eventDate).format('h:mma')}
>>>>>>> feature/Maps
                </div>
              </div>
            </div>
          }
        />
      </Card>
<<<<<<< HEAD
=======
      <button onClick={this.onClick}> Go back to search </button>
>>>>>>> feature/Maps
    </div>
  );
}
}
// };

function mapStateToProps(state) {
  return {
    activeEvent: state.activeEvent,
  };
}

export default connect(mapStateToProps)(EventDetails);
