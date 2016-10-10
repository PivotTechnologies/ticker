import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { signin } from '../../actions/index';

class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errorMessage: '',
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onUsernameChange(event) {
    this.setState({
      username: event.target.value,
      errorMessage: '',
    });
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value,
      errorMessage: '',
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.signin(this.state.username, this.state.password)
      .then((response) => {
        if (response.payload.status === 200) {
          this.setState({
            username: '',
            password: '',
            errorMessage: '',
          });
          browserHistory.push('/');
        }
        else {
          this.setState({
            errorMessage: 'Incorrect username and/or password',
          });
        }
      });
  }

  render() {
    return (
      <Paper zDepth={0} className="main-content" style={{backgroundColor: '#e1e3e4'}}>
        <h1>Sign In</h1>
        <form className="auth" onSubmit={this.onFormSubmit}>
          <Paper zDepth={2} className="auth-input">
            <TextField
              className="auth-input-text"
              onChange={this.onUsernameChange}
              value={this.state.username}
              hintText="Username"
              underlineShow={false}
            />
            <Divider />
            <TextField
              className="auth-input-text"
              onChange={this.onPasswordChange}
              value={this.state.password}
              hintText="Password"
              type="password"
              errorText={this.state.errorMessage}
              underlineShow={false}
            />
            <Divider />
          </Paper>
          <RaisedButton
            type="submit"
            label="Sign In"
            labelStyle={{color: 'white'}}
            backgroundColor='#677077'
          />
          <p className="auth-message">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </form>
      </Paper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signin }, dispatch);
}

export default connect(null, mapDispatchToProps)(Signin);
