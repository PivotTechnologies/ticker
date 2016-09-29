import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LinearProgress from 'material-ui/LinearProgress';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import NavBar from './NavBar.jsx';
import { bindActionCreators } from 'redux';
import { reauthenticate } from '../actions/index';

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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ reauthenticate }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
