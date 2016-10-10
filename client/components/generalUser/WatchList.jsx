import React from 'react';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/content/clear';
import GoIcon from 'material-ui/svg-icons/action/pageview';
import Divider from 'material-ui/Divider';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { fetchWatchList, removeWatch, fetchEventById, fetchAuctionById, fetchAuctions, startSpinner, stopSpinner } from '../../actions/index';

class WatchList extends React.Component {
  constructor(props) {
    super(props);

    this.removeWatch = this.removeWatch.bind(this);
    this.renderWatchList = this.renderWatchList.bind(this);
  }

  removeWatch(auctionId) {
    this.props.removeWatch(this.props.user.id, auctionId)
      .then(response => this.props.fetchWatchList(this.props.user.id));
  }

  routeToAuctionDetails(auctionId, eventId) {
    this.props.closeWatchList();
    this.props.startSpinner();
    this.props.fetchEventById(eventId)
      .then(() => {
        this.props.fetchAuctionById(auctionId, eventId)
          .then(() => {
            console.log('fetching auctions')
            this.props.fetchAuctions(eventId)
              .then(() => {
                browserHistory.push(`/event/${eventId}/auction/${auctionId}/`);
                this.props.stopSpinner();
              });
          });
      });
  }

  renderWatchList() {
    if (!this.props.watchList) {
      return (
        <div>
          <span>You are not watching any auctions</span>
        </div>
      );
    }
    console.log(this.props.watchList)
    return (
      this.props.watchList.map(auction => (
        <div key={auction.id}>
          <div className="watch-list-item">
            <IconButton
              onClick={() => this.removeWatch(auction.id)}
              style={{position: 'absolute', top: 0, right: 0}}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={() => this.routeToAuctionDetails(auction.id, auction.eventId)}
              style={{position: 'absolute', bottom: 0, right: 0}}
            >
              <GoIcon />
            </IconButton>
            <p className="watch-list-event-name">{auction.eventName}</p>
            <p>{moment(auction.eventDate).format('MMM. DD, YYYY')}</p>
            <p>${auction.currentPrice}</p>
          </div>
          <Divider />
        </div>
      ))
    );
  }

  render() {
    return (
      <Paper zDepth={0} className="watch-list">
        {this.renderWatchList()}
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    watchList: state.watchList,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWatchList, removeWatch, fetchEventById, fetchAuctionById, fetchAuctions, startSpinner, stopSpinner }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
