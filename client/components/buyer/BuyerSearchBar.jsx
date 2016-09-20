import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchEvents } from '../../actions/index';

class BuyerSearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      date: '',
      city: '',
    };

    this.onQueryChange = this.onQueryChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onQueryChange(event) {
    this.setState({ query: event.target.value });
  }

  onDateChange(event) {
    this.setState({ date: event.target.value });
  }

  onCityChange(event) {
    this.setState({ city: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.searchEvents(this.state.query, this.state.date, this.state.city);
    this.setState({ query: '' });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input
          onChange={this.onQueryChange}
          value={this.state.query}
          placeholder="Search for Events"
        />
        <input
          type="date"
          onChange={this.onDateChange}
          value={this.state.date}
        />
        <input
          onChange={this.onCityChange}
          value={this.state.city}
          placeholder="City"
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchEvents }, dispatch);
}

export default connect(null, mapDispatchToProps)(BuyerSearchBar);
