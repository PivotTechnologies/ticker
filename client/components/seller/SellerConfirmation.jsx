import React from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';

class SellerConfirmation extends React.Component {

  render() {
    const auction = this.props.newAuction;

    return (
      <Card className="sellerConfirmation" zDepth={0} style={{borderRadius: '8px'}}>
        <CardHeader
        />
        <img src='../../assets/images/confirm.png' />
        <CardTitle title="Thank You!" subtitle="Sit back and relax, we'll take care of the rest" />
        <CardTitle  />
        <CardText>
          <div>Event: {auction.eventName}</div>
          <div>Date: {moment(auction.eventDate).format('MMMM Do, YYYY [@] h:mma')}</div>
          <div>Number of tickets: {auction.numTickets}</div>
          <div>Start Price: ${auction.startPrice}</div>
          <div>Min Price: ${auction.minPrice}</div>
        </CardText>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    newAuction: state.newAuction,
    events: state.events,
    userLocation: state.userLocation,
  };
}

export default connect(mapStateToProps)(SellerConfirmation);
