import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signin } from '../../actions/index';

class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.signin(this.state.username, this.state.password);
    this.setState({ username: '', password: '' });
  }

  render() {
    return (
      <form className="auth" onSubmit={this.onFormSubmit}>
        <input
          className="auth-input"
          type="text"
          onChange={this.onUsernameChange}
          value={this.state.username}
          placeholder="username"
        />

        <input
          className="auth-input"
          type="password"
          onChange={this.onPasswordChange}
          value={this.state.password}
          placeholder="password"
        />
        <button type="submit">Sign In</button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signin }, dispatch);
}

export default connect(null, mapDispatchToProps)(Signin);
