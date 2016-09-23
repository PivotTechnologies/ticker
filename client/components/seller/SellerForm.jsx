import React from 'react';
import { connect } from 'react-redux';
import { createAuction } from '../../actions/index.js';
import { bindActionCreators } from 'redux';

class SellerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectEvent: '',
      startPrice: '',
      minPrice: '',
      numTickets: '',
      userID: '',
    };

    this.onStartPriceChange = this.onStartPriceChange.bind(this);
    this.onMinPriceChange = this.onMinPriceChange.bind(this);
    this.onNumTicketsChange = this.onNumTicketsChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  // need to set selectedEvent
  // need to set userID

  onFormSubmit(event) {
    event.preventDefault();
    console.log('this.state: ', this.state);
    this.props.createAuction(this.state.selectEvent, this.state.startPrice, this.state.minPrice,
      this.state.numTickets, this.state.userId);
    this.setState({
      selectEvent: '',
      startPrice: '',
      minPrice: '',
      numTickets: '',
      userID: '',
    });
  }

  onStartPriceChange(event) {
    this.setState({ startPrice: event.target.value });
  }

  onMinPriceChange(event) {
    this.setState({ minPrice: event.target.value });
  }

  onNumTicketsChange(event) {
    this.setState({ numTickets: event.target.value });
  }

  componentWillMount() {
    this.setState({
      selectEvent: this.props.activeEvent,
      userID: this.props.userID,
    });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        Event Selected: {this.state.selectEvent}
        <input
          type="integer"
          onChange={this.onStartPriceChange}
          value={this.state.startPrice}
          placeholder="Start Price"
        />
        <input
          type="integer"
          onChange={this.onMinPriceChange}
          value={this.state.minPrice}
          placeholder="Minimum Price"
        />
        <input
          type="integer"
          onChange={this.onNumTicketsChange}
          value={this.state.numTickets}
          placeholder="Number of Tickets"
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeEvent: state.activeEvent,
    userID: state.userID,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createAuction }, dispatch);
}

export default connect(null, mapDispatchToProps)(SellerForm);

// export default SellerForm;
