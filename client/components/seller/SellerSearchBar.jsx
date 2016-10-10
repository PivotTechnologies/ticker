import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchSeatGeek, startSpinner } from '../../actions/index.js';

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
    this.props.startSpinner();
    this.props.searchSeatGeek(this.state.query);
    this.setState({ query: '' });
  }

  render() {
    return (
      <Paper zDepth={2} className="seller-search-bar" style={{borderRadius: '8px'}}>
        <form className="seller-search-bar-form" onSubmit={this.onFormSubmit}>
          <TextField
            className="seller-event-field"
            onChange={this.onQueryChange}
            value={this.state.query}
            hintText="Search for Events"
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
  return bindActionCreators({ searchSeatGeek, startSpinner }, dispatch);
}

export default connect(null, mapDispatchToProps)(SellerSearchBar);
