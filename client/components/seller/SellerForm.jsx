import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { createAuction } from '../../actions/index.js';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

class SellerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.user.id,
      startPrice: '',
      minPrice: '',
      numTickets: '',
      file: null,
      errorMessage: '',
    };

    this.onStartPriceChange = this.onStartPriceChange.bind(this);
    this.onMinPriceChange = this.onMinPriceChange.bind(this);
    this.onNumTicketsChange = this.onNumTicketsChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.renderFilePreview = this.renderFilePreview.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();

    if (this.state.file) {
      var reader = new FileReader();

      reader.onload = (e) => {
        var dataUrl = reader.result;
        console.log(dataUrl)
        this.props.createAuction(
          this.props.activeEvent,
          this.state.startPrice,
          this.state.minPrice,
          this.state.numTickets,
          this.state.userId,
          dataUrl
        );
      }

      reader.readAsDataURL(this.state.file);

      console.log('AUCTION CREATED');
      browserHistory.push('/sell/confirm');

    } else {
      this.setState({ errorMessage: 'Please upload your tickets.' });
    }
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

  onClick(event) {
    browserHistory.push(`/sell`);
  }

  openFileUpload() {
    document.getElementById("file-upload").click();
  }

  handleFileUpload() {
    const file = document.getElementById("file-upload").files[0];
    this.setState({ file });
  }

  renderFilePreview(errorMessage) {
    if (this.state.file) {
      return <div className="file-name">{this.state.file.name}</div>;
    }

    return <div className="file-name">{this.state.errorMessage}</div>;
  }

  render() {
    return (
      <Paper zDepth={0}>
        <div>
          <h3>Event
              <button onClick={this.onClick}> Go back to search </button>
          </h3>

          <p> Name: { this.props.activeEvent.name } </p>
          <p> Date: { this.props.activeEvent.datetime_local }, &nbsp;
            Timezone: { this.props.activeEvent.timezone } </p>
          <p> Venue: { this.props.activeEvent.venue } </p>
          <p> Address: { this.props.activeEvent.address }, &nbsp;
            { this.props.activeEvent.city }, &nbsp;
            {this.props.activeEvent.state } &nbsp;
            {this.props.activeEvent.zip }
          </p>
        </div>
        <form onSubmit={this.onFormSubmit}>
          <input
            type="integer"
            required="required"
            onChange={this.onStartPriceChange}
            value={this.state.startPrice}
            placeholder="Start Price $"
          />
          <input
            type="integer"
            required="required"
            onChange={this.onMinPriceChange}
            value={this.state.minPrice}
            placeholder="Minimum Price $"
          />
          <input
            type="integer"
            required="required"
            onChange={this.onNumTicketsChange}
            value={this.state.numTickets}
            placeholder="Number of Tickets"
          />
          <div className="file-upload-container">
            <RaisedButton label='Upload Tickets' onClick={this.openFileUpload} />
            <input
              type="file"
              accept="application/pdf"
              id="file-upload"
              onChange={this.handleFileUpload}
            />
            {this.renderFilePreview()}
          </div>
          <button type="submit">Submit</button>
        </form>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    activeEvent: state.activeEvent,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createAuction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerForm);
