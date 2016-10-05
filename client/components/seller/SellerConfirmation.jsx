import React from 'react';
import { connect } from 'react-redux';

class SellerConfirmation extends React.Component {
  render() {
    if (this.props.newAuction.tickets) {
      return <div>We have your tickets</div>;
    }

    return (
      <div>
        <h1>You created an auction.</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    newAuction: state.newAuction,
  };
}

export default connect(mapStateToProps)(SellerConfirmation);
