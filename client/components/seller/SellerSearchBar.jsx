import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchSeatGeek } from '../../actions/index.js';

class SellerSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };

    this.onQueryChange = this.onQueryChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onQueryChange(event) {
    this.setState({ query: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.searchSeatGeek(this.state.query);
    this.setState({ query: '' });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input
          type="text"
          onChange={this.onQueryChange}
          value={this.state.query}
          placeholder="Event"
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchSeatGeek }, dispatch);
}

export default connect(null, mapDispatchToProps)(SellerSearchBar);
