import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchEvents, startSpinner, clearMarker, clearTab } from '../../actions/index';

class BuyerSearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      date: null,
      location: '',
    };

    this.onQueryChange = this.onQueryChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.clearDate = this.clearDate.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onQueryChange(event) {
    this.setState({ query: event.target.value });
  }

  onDateChange(event, date) {
    this.setState({ date });
  }

  clearDate() {
    this.setState({ date: null });
  }

  onLocationChange(event) {
    this.setState({ location: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.startSpinner();
    this.props.clearMarker();
    this.props.clearTab();
    const dateString = this.state.date ?
                       moment(this.state.date).format('YYYY-MM-DD') : '';
    this.props.searchEvents(this.state.query, dateString, this.state.location);
    this.setState({ query: '' });
  }

  render() {
    return (
      <Paper zDepth={2} className="search-bar" style={{borderRadius: '8px'}}>
        <form className="search-bar-form" onSubmit={this.onFormSubmit}>
          <TextField
            className="event-field search-field-border search-field-text"
            onChange={this.onQueryChange}
            value={this.state.query}
            hintText="Search for Events"
            underlineShow={false}
          />
          <DatePicker
            className="date-field search-field-border search-field-text"
            onChange={this.onDateChange}
            onDismiss={this.clearDate}
            value={this.state.date}
            formatDate={date => moment(date).format('M/DD/YYYY')}
            hintText="Any Date"
            container="inline"
            underlineShow={false}
            autoOk={true}
            cancelLabel="Any Date"
          />
          <TextField
            className="location-field search-field search-field-text"
            onChange={this.onLocationChange}
            value={this.state.location}
            hintText="Location"
            underlineShow={false}
          />
          <IconButton type="submit">
            <ActionSearch />
          </IconButton>
        </form>
      </Paper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchEvents, startSpinner, clearMarker, clearTab }, dispatch);
}

export default connect(null, mapDispatchToProps)(BuyerSearchBar);
