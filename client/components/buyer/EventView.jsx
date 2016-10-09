import React from 'react';
import Paper from 'material-ui/Paper';
import LinearProgress from 'material-ui/LinearProgress';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEventById, fetchAuctions, fetchAuctionById } from '../../actions/index';
import EventDetails from './EventDetails.jsx';
import AuctionList from './AuctionList.jsx';

class EventView extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      isLoading: false,
      intervalId: null,
    };
  }

  componentWillMount() {
    if (!this.props.activeEvent || this.props.activeEvent.id != this.props.params.eventId) {
      this.setState({ isLoading: true });
      this.props.fetchEventById(this.props.params.eventId)
        .then(() => {
          if (this.props.activeEvent.numAuctions < 1) {
            browserHistory.push('/oops');
          } else {
            this.props.fetchAuctions(this.props.params.eventId)
              .then(() => {
                if (this.props.params.auctionId) {
                  this.props.fetchAuctionById(this.props.params.auctionId, this.props.params.eventId);
                }
              })
                .then(() => this.setState({ isLoading: false }));
          }
        })
        .catch(() => browserHistory.push('/oops'));
    }
  }

  componentDidMount() {
    const id = setInterval(() => {
      console.log('updating auction prices in event view!')

      this.props.fetchAuctions(this.props.params.eventId);

      if (this.props.params.auctionId) {
        this.props.fetchAuctionById(this.props.params.auctionId, this.props.params.eventId);
      }
    }, 1000);
    this.setState({ intervalId: id });
  }

  componentWillUnmount() {
    console.log('no longer updating auction prices in event view')
    clearInterval(this.state.intervalId);
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
      <Paper zDepth={0} className="main-content">
        <EventDetails />
        <div className="auction-container">
          <Paper zDepth={1} style={{flex: 1, overflow: 'scroll'}}>
            <AuctionList />
          </Paper>
          <Paper zDepth={1} style={{flex: 2, height: '100%'}}>
            {this.props.children}
          </Paper>
        </div>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeEvent: state.activeEvent,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEventById, fetchAuctions, fetchAuctionById }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventView);
