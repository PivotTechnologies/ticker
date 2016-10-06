import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { selectAuction } from '../../actions/index';

class AuctionListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.selectAuction(this.props.auction);
    browserHistory.push(`/auction/${this.props.auction.id}`);
  }

  render() {
    return (
      <Card className="list-item auction-list-item" onClick={this.handleClick}>
        <CardHeader title="sellerUsername" />
        <CardTitle
          title={
            `${this.props.auction.numTickets} Ticket(s) -
            $${this.props.auction.currentPrice}`
          }
        />
      </Card>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectAuction }, dispatch);
}

export default connect(null, mapDispatchToProps)(AuctionListItem);
