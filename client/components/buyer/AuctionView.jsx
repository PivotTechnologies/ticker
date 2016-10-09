import React from 'react';
import Paper from 'material-ui/Paper';
import LinearProgress from 'material-ui/LinearProgress';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAuctionById } from '../../actions/index';

class AuctionView extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      isLoading: false
    };
  }

  componentWillMount() {
    if (!this.props.activeAuction || this.props.activeAuction.id != this.props.params.auctionId) {
      this.setState({ isLoading: true });
      this.props.fetchAuctionById(this.props.params.auctionId)
        .then(() => this.setState({ isLoading: false }))
        .catch(() => browserHistory.push('/oops'));
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="spinner">
          <LinearProgress
            style={{ height: '10px' }}
            mode="indeterminate"
            />
        </div>
      );
    }

    return (
      <Paper zDepth={0}>
        {this.props.children}
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeAuction: state.activeAuction,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchAuctionById }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionView);
