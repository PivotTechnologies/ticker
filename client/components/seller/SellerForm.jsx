import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import { createAuction } from '../../actions/index.js';

class SellerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.user.id,
      startPrice: '',
      minPrice: '',
      numTickets: '',
      file: null,
      errorFileUpload: '',
      errorStartPrice: '',
      errorMinPrice: '',
      errorNumTickets: '',
      open: false,
    };

    this.onStartPriceChange = this.onStartPriceChange.bind(this);
    this.onMinPriceChange = this.onMinPriceChange.bind(this);
    this.onNumTicketsChange = this.onNumTicketsChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.renderFilePreview = this.renderFilePreview.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();

    if (this.state.errorStartPrice.length === 0 && this.state.errorMinPrice.length === 0 && this.state.errorNumTickets.length === 0) {
      if (this.state.file) {
        const reader = new FileReader();
        reader.onload = () => {
          let dataUrl = reader.result;
          this.props.createAuction(
            this.props.activeEvent,
            this.state.startPrice,
            this.state.minPrice,
            this.state.numTickets,
            this.state.userId,
            this.props.user.username,
            dataUrl
          );
        };
        reader.readAsDataURL(this.state.file);

        this.setState({
          startPrice: '',
          minPrice: '',
          numTickets: '',
          file: null,
          errorFileUpload: '',
          errorStartPrice: '',
          errorMinPrice: '',
          errorNumTickets: '',
        });

        browserHistory.push('/sell/confirm');

    }
    else {
      console.log('error File Upload');
      this.setState({ errorFileUpload: 'Please upload your tickets.' });
    }
  }
}


  onStartPriceChange(event) {
    const regex = /^\$?[0-9]+(\.[0-9][0-9])?$/;
    this.setState({
      startPrice: event.target.value,
    });
    if (regex.test(event.target.value) && (event.target.value > 0)
      && (event.target.value < 1000000)) {
      this.setState({
        errorStartPrice: '',
      });
    } else {
      this.setState({
        errorStartPrice: 'Invalid price',
      });
    }
  }

  onMinPriceChange(event) {
    this.setState({ minPrice: event.target.value });
    const regex = /^\$?[0-9]+(\.[0-9][0-9])?$/; // limits input to two decimal places
    if (regex.test(event.target.value) && (event.target.value > 0) && (event.target.value < 1000000)
      && (+this.state.startPrice > +event.target.value)) {
      this.setState({
        errorMinPrice: '',
        inputsValid: true,
      });
    } else {
      this.setState({
        errorMinPrice: 'Invalid price',
      });
    }
  }

  onNumTicketsChange(event) {
    this.setState({ numTickets: event.target.value });
    if (event.target.value > 0 && event.target.value < 100) {
      this.setState({
        errorNumTickets: '',
      });
    } else {
      this.setState({
        errorNumTickets: 'Invalid input',
      });
    }
  }

  onClick() {
    browserHistory.push(`/sell`);
  }

  handleOpen() {
     this.setState({ open: true });
   }

  handleClose() {
     this.setState({ open: false });
  }

  openFileUpload() {
    document.getElementById('file-upload').click();
  }

  handleFileUpload() {
    const file = document.getElementById('file-upload').files[0];
    this.setState({ file });
  }

  renderFilePreview() {
    if (this.state.file) {
      return <div className="file-name">{this.state.file.name}</div>;
    }

    return <div className="file-name">{this.state.errorFileUpload}</div>;
  }

  render() {
    const actions = [
       <FlatButton
         label="Cancel"
         primary={true}
         onTouchTap={this.handleClose}
       />,
       <FlatButton
         label="Create"
         type="Submit"
         primary={true}
         onClick={this.onFormSubmit}
         onTouchTap={this.handleClose}
       />,
     ];

    return (
      <Paper className="sellerform" zDepth={2} style={{background: '#e1e3e4'}}>
        <RaisedButton
          className="sellerformbutton"
          onClick={this.onClick}
          label="Go back to search"
          labelStyle={{color: 'white'}}
          backgroundColor='#677077'
        />
          <Card className="list-item">
            <CardTitle
              title={this.props.activeEvent.name}
              subtitle={
                <div>
                  <div>
                    {this.props.activeEvent.venue} - {this.props.activeEvent.city}, {this.props.activeEvent.state}
                  </div>
                  <div>
                    {moment(this.props.activeEvent.eventDate).format('MMMM Do, YYYY [@] h:mma')}
                  </div>
                </div>
              }
            />
          </Card>

        <form className="sellerinputform" >
          <TextField
            type="number"
            step="0.01"
            onChange={this.onStartPriceChange}
            value={this.state.startPrice}
            floatingLabelText="Start Price $"
            errorText={this.state.errorStartPrice}
          />
          <TextField
            type="number"
            step="0.01"
            onChange={this.onMinPriceChange}
            value={this.state.minPrice}
            floatingLabelText="Minimum Price $"
            errorText={this.state.errorMinPrice}
          />
          <TextField
            type="integer"
            onChange={this.onNumTicketsChange}
            value={this.state.numTickets}
            floatingLabelText="Number of Tickets"
            errorText={this.state.errorNumTickets}
          />
          <div className="file-upload-container">
            <RaisedButton
              label="Upload Tickets"
              onClick={this.openFileUpload}
              labelStyle={{color: 'white'}}
              backgroundColor='#677077'
            />
            <input
              type="file"
              accept="application/pdf"
              id="file-upload"
              onChange={this.handleFileUpload}
            />
            {this.renderFilePreview()}
          </div>
          <RaisedButton
            className="sellerformbutton"
            onTouchTap={this.handleOpen}
            label="Create"
            labelStyle={{color: 'white'}}
            backgroundColor='#677077'
          />
        </form>
        <div>
          <Dialog
            title="Please confirm auction creation"
            actions={actions}
            modal={true}
            open={this.state.open}
          >
          </Dialog>
        </div>
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
