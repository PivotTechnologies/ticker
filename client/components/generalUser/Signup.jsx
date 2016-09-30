import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
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
      errorFirstName: '',
      errorLastName: '',
      errorUserName: '',
      errorEmail: '',
      errorPassWord: '',
      errorConfirm: '',
      passwordMatch: false,
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
    const regex = /^[a-zA-Z]{1,50}$/; // limits string length, min 1, max 50, letters only
    this.setState({
      firstName: event.target.value,
    });

    if (regex.test(event.target.value)) {
      this.setState({ errorFirstName: '' });
    }
    else {
      this.setState({ errorFirstName: 'Invalid input' });
    }
  }

  onLastnameChange(event) {
    const regex = /^[a-zA-Z]{1,50}$/; // limits string length, min 1, max 50, letters only
    this.setState({ lastName: event.target.value });
    if (regex.test(event.target.value)) {
      this.setState({
        errorLastName: '',
      });
    }
    else {
      this.setState({
        errorLastName: 'Invalid input',
      });
    }
  }

  onUsernameChange(event) {
    const regex = /^[a-zA-Z0-9]{3,50}$/; // limits string length, min 3, max 50, all letters, numbers
    this.setState({ username: event.target.value });
    if (regex.test(event.target.value)) {
      this.setState({ errorUserName: '' });
    }
    else {
      this.setState({ errorUserName: 'Must be at least 3 characters' });
    }
  }

  onEmailChange(event) {
    const regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    this.setState({ email: event.target.value });
    if (regex.test(event.target.value)) {
      this.setState({ errorEmail: '' });
    }
    else {
      this.setState({ errorEmail: 'Invalid email' });
    }
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
    const regex = /^[ A-Za-z0-9_@./#&+-]{3,50}$/; // limits string length, min 3, max 15, all letters, numbers, symbols
    if (regex.test(event.target.value)) {
      this.setState({
        errorPassWord: '',
      });
    }
    else {
      this.setState({
        errorPassWord: 'Must be at least 3 characters long',
      });
    }
  }

  onConfirmPasswordChange(event) {
    this.setState({ confirmPassword: event.target.value });
    if (event.target.value === this.state.password) {
      this.setState({
        errorConfirm: '',
        passwordMatch: true,
      });
    }
    else {
      this.setState({
        errorConfirm: 'Passwords do not match',
        passwordMatch: false,
      });
    }
  }

  onFormSubmit(event) {
    event.preventDefault();
    if (this.state.errorFirstName.length === 0 && this.state.errorLastName.length === 0
      && this.state.errorUserName.length === 0 && this.state.errorEmail.length === 0
        && this.state.errorPassWord.length === 0 && this.state.errorConfirm.length === 0
          && this.state.passwordMatch) {
      this.props.signup(this.state.firstName, this.state.lastName, this.state.username, this.state.email, this.state.password)
        .then((response) => {
          //console.log("response:", response.payload.response.data.errors[0].path);
          if (response.payload.status === 200) {
            this.setState({
              firstName: '',
              lastName: '',
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
              errorFirstName: '',
              errorLastName: '',
              errorUserName: '',
              errorEmail: '',
              errorPassWord: '',
              errorConfirm: '',
              passwordMatch: false,
            });

            browserHistory.push('/');
          }
          else {
            if (response.payload.response.data.errors[0].path === 'username') {
              this.setState({
                errorUserName: 'Username already taken',
              });
            }
            else {
              if (response.payload.response.data.errors[0].path === 'email') {
                this.setState({
                  errorEmail: 'Email already taken',
                });
              }
            }
          }
        });
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
              errorText={this.state.errorFirstName}
              underlineShow={false}
            />
            <Divider />
            <TextField
              className="auth-input-text"
              onChange={this.onLastnameChange}
              value={this.state.lastName}
              hintText="Last Name"
              errorText={this.state.errorLastName}
              underlineShow={false}
            />
            <Divider />
            <TextField
              className="auth-input-text"
              onChange={this.onEmailChange}
              value={this.state.email}
              hintText="E-mail Address"
              errorText={this.state.errorEmail}
              underlineShow={false}
            />
            <Divider />
            <TextField
              className="auth-input-text"
              onChange={this.onUsernameChange}
              value={this.state.username}
              hintText="Username"
              errorText={this.state.errorUserName}
              underlineShow={false}
            />
            <Divider />
            <TextField
              className="auth-input-text"
              onChange={this.onPasswordChange}
              value={this.state.password}
              type="password"
              hintText="Password"
              errorText={this.state.errorPassWord}
              underlineShow={false}
            />
            <Divider />
            <TextField
              className="auth-input-text"
              onChange={this.onConfirmPasswordChange}
              value={this.state.confirmPassword}
              hintText="Confirm Password"
              type="password"
              errorText={this.state.errorConfirm}
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
