import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LinearProgress from 'material-ui/LinearProgress';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import NavBar from './NavBar.jsx';

injectTapEventPlugin();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.renderSpinner = this.renderSpinner.bind(this);
  }

  componentWillMount() {
    const token = localStorage.getItem('userToken');

    if (token) {
      this.props.authenticate(token);
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

export default connect(mapStateToProps)(App);
