import React from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWatchList, removeWatch } from '../../actions/index';

class WatchList extends React.Component {
  constructor(props) {
    super(props);

    this.removeWatch = this.removeWatch.bind(this);
    this.renderWatchList = this.renderWatchList.bind(this);
  }

  removeWatch() {
    this.props.removeWatch(watchId)
    .then(response => this.props.fetchWatchList(this.props.user.id));
  }

  renderWatchList() {
    if (!this.props.watchList) {
      return (
        <div>
          <span>You are not watching any auctions.</span>
        </div>
      );
    }
    return (
      this.props.watchList.map(watch => (
        <div className="watch-list-item" key={watch.id}>
          <p>{watch.eventName}</p>
          <p>{watch.eventDate}</p>
          <p>${watch.currentPrice}</p>
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
  return bindActionCreators({ fetchWatchList, removeWatch }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
