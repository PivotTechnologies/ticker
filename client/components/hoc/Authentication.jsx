import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';


export default function (ComposedComponent) {
  class Authentication extends React.Component {

    componentWillMount() {
      if (!localStorage.getItem('token')) {
        browserHistory.push('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      if (!localStorage.getItem('token')) {
        browserHistory.push('/signin');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  function mapStateToProps(state) {
    return { token: state.user.token };
  }

  return connect(mapStateToProps)(Authentication);
}
