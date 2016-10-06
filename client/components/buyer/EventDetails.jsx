import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
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
          <img src={this.props.activeEvent.image} />
        </CardMedia>

      </Card>
      <Card style={{flex: '1'}}>
        <CardTitle
          title={this.props.activeEvent.name}
          subtitle={
            <div className="event-details-text">
              <div>
                <div>
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
                </div>
              </div>
            </div>
          }
        />
      </Card>
      <button onClick={this.onClick}> Go back to search </button>
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
