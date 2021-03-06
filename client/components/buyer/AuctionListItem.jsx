import React from 'react';
import { Card, CardHeader, CardTitle } from 'material-ui/Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { selectAuction } from '../../actions/index';

class AuctionListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.renderPlural = this.renderPlural.bind(this);
  }

  handleClick() {
    this.props.selectAuction(this.props.auction);
    browserHistory.push(`/event/${this.props.auction.eventId}/auction/${this.props.auction.id}/`);
  }

  renderPlural() {
    if (this.props.auction.numTickets > 1){
      return 's';
    }
    return '';
  }

  render() {
    return (
      <Card className="auction-list-item" onClick={this.handleClick}>
        <CardHeader title={`Sold by: ${this.props.auction.sellerName}`} />
        <CardTitle
          title={
            `${this.props.auction.numTickets} Ticket${this.renderPlural()} -
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
