import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import EyeIcon from 'material-ui/svg-icons/image/remove-red-eye';
import LinearProgress from 'material-ui/LinearProgress';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { bindActionCreators } from 'redux';
import NavBar from './NavBar.jsx';
import WatchList from './generalUser/WatchList.jsx';
import { reauthenticate, fetchWatchList } from '../actions/index';
import { reauthenticate, getLocation } from '../actions/index';

injectTapEventPlugin();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.renderSpinner = this.renderSpinner.bind(this);
    this.openWatchList = this.openWatchList.bind(this);
    this.closeWatchList = this.closeWatchList.bind(this);
  }

  componentWillMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.reauthenticate(token);
    }
  }

  componentDidUpdate() {
      setInterval(() => this.props.fetchWatchList(this.props.user.id), 1000);
    }

  renderSpinner() {
    if (this.props.isLoading) {
      return (
        <div className="spinner">
          <LinearProgress
            style={{ height: '10px' }}
            mode="indeterminate"
          />
        </div>
      );
    }

    return <div />;
  }

  renderWatchList() {
    if (localStorage.getItem('token')) {
      return (
        <div>
          <FloatingActionButton
            mini={true}
            onClick={this.openWatchList}
            style={{
              position: 'absolute',
              top: '50vh',
              right: 15,
              width: 'auto',
              height: 'auto'
            }}
          >
            <EyeIcon />
          </FloatingActionButton>
          <Drawer
            docked={false}
            open={this.state.open}
            openSecondary={true}
            onRequestChange={this.closeWatchList}
            containerStyle={{height: 'calc(100vh - 64px)', top: 64}}
          >
            <AppBar title="Watch List" showMenuIconButton={false} />
            <WatchList closeWatchList={this.closeWatchList} />
          </Drawer>
        </div>
      );
    }
  }

  openWatchList() {
    this.setState({ open: true });
  }

  closeWatchList() {
    this.setState({ open: false });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          <NavBar />
          {this.renderSpinner()}
          <div className="app-content">
            {this.props.children}
            {this.renderWatchList()}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    isLoading: state.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ reauthenticate, fetchWatchList, getLocation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
