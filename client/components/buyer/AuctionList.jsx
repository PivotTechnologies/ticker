import React from 'react';
import { connect } from 'react-redux';
import { fetchAuctions } from '../../actions/index.js';
import { bindActionCreators } from 'redux';
import AuctionListItem from './AuctionListItem.jsx';

class AuctionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      intervalId: null
    };
  }

  componentDidMount() {
    const id = setInterval(() => {
      console.log('updating auctions!')
      this.props.fetchAuctions(this.props.activeEvent.id);
    }, 1000);
    this.setState({ intervalId: id });
  }

  componentWillUnmount() {
    console.log('no longer updating auctions')
    clearInterval(this.state.intervalId);
  }

  renderAuctionList() {
    return this.props.auctions.map((auction, idx) =>
      <AuctionListItem key={idx} auction={auction} />
    );
  }

  render() {
    return (
      <div>
        { this.renderAuctionList() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeEvent: state.activeEvent,
    auctions: state.auctions,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchAuctions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionList);
