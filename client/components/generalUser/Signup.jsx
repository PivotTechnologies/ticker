import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signup } from '../../actions/index';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    this.onFirstnameChange = this.onFirstnameChange.bind(this);
    this.onLastnameChange = this.onLastnameChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFirstnameChange(event) {
    this.setState({ firstName: event.target.value });
  }

  onLastnameChange(event) {
    this.setState({ lastName: event.target.value });
  }

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onConfirmPasswordChange(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      this.props.signup(this.state.firstName, this.state.lastName, this.state.username,
        this.state.email, this.state.password);
      this.setState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } else {
      // Need to add error window/popup

      console.log('Passwords do not match');
    }
  }

  render() {
    return (
      <Paper zDepth={0} className="main-content">
        <h1>Sign Up</h1>
        <form className="auth" onSubmit={this.onFormSubmit}>
          <Paper zDepth={2} className="auth-input">
            <TextField
              className="auth-input-text"
              onChange={this.onFirstnameChange}
              value={this.state.firstName}
              hintText="First Name"
              underlineShow={false}
            />
            <Divider />
            <TextField
              className="auth-input-text"
              onChange={this.onLastnameChange}
              value={this.state.lastName}
              hintText="Last Name"
              underlineShow={false}
            />
            <Divider />
            <TextField
              className="auth-input-text"
              onChange={this.onEmailChange}
              value={this.state.email}
              hintText="E-mail Address"
              type="email"
              underlineShow={false}
            />
            <Divider />
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
              underlineShow={false}
            />
            <Divider />
            <TextField
            className="auth-input-text"
            onChange={this.onConfirmPasswordChange}
            value={this.state.confirmPassword}
            hintText="Confirm Password"
            type="password"
            underlineShow={false}
            />
          </Paper>
          <RaisedButton type="submit">Sign Up</RaisedButton>
          <p className="auth-message">
            Already have an account? <a href="/signin">Sign In</a>
          </p>
        </form>
      </Paper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signup }, dispatch);
}

export default connect(null, mapDispatchToProps)(Signup);
