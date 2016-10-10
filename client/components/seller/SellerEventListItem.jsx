import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import moment from 'moment';
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
      <Card className="list-item" onClick={this.handleClick} style={{borderRadius: '8px'}}>
        <CardTitle
          title={this.props.event.name}
          subtitle={
            <div>
              <div>
                {this.props.event.venue} - {this.props.event.city}, {this.props.event.state}
              </div>
              <div>
                {moment(this.props.event.eventDate).format('MMMM Do, YYYY [@] h:mma')}
              </div>
            </div>
          }
        />
      </Card>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectEvent }, dispatch);
}

export default connect(null, mapDispatchToProps)(SellerEventListItem);
