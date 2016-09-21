import React from 'react';
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
    };

    this.onFirstnameChange = this.onFirstnameChange.bind(this);
    this.onLastnameChange = this.onLastnameChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
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

  onFormSubmit(event) {
    event.preventDefault();
    this.props.signup(this.state.firstName, this.state.lastName, this.state.username,
      this.state.email, this.state.password);
    this.setState({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    });
  }

  render() {
    return (
      <form className="auth" onSubmit={this.onFormSubmit}>
        <input
          className="auth-input"
          type="text"
          onChange={this.onFirstnameChange}
          value={this.state.firstName}
          placeholder="First Name"
        />

        <input
          className="auth-input"
          type="text"
          onChange={this.onLastnameChange}
          value={this.state.lastName}
          placeholder="Last Name"
        />

        <input
          className="auth-input"
          type="text"
          onChange={this.onUsernameChange}
          value={this.state.username}
          placeholder="Username"
        />

        <input
          className="auth-input"
          type="email"
          onChange={this.onEmailChange}
          value={this.state.email}
          placeholder="Email"
        />

        <input
          className="auth-input"
          type="password"
          onChange={this.onPasswordChange}
          value={this.state.password}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signup }, dispatch);
}

export default connect(null, mapDispatchToProps)(Signup);
