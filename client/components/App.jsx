import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LinearProgress from 'material-ui/LinearProgress';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { bindActionCreators } from 'redux';
import NavBar from './NavBar.jsx';
import { reauthenticate, getLocation } from '../actions/index';

injectTapEventPlugin();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.renderSpinner = this.renderSpinner.bind(this);
  }

  componentWillMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.reauthenticate(token);
    }
  }

  componentDidMount() {
    this.props.getLocation();
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

  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          <NavBar />
          {this.renderSpinner()}
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    userLocation: state.userLocation,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ reauthenticate, getLocation }, dispatch);
  // return {
  //   reauthenticate: (x)=>dispatch(reauthenticate(x)),
  //   dispatch: (x)=>dispatch(x)
  // }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
