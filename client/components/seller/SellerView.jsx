import React from 'react';
import Paper from 'material-ui/Paper';
import SellerSearchBar from './SellerSearchBar.jsx';
import SellerEventList from './SellerEventList.jsx';

const SellerView = () => (
  <Paper className="main-content" zDepth={0} style={{background: '#e1e3e4'}}>
    <h1>Sell Tickets</h1>
    <SellerSearchBar />
    <SellerEventList />
  </Paper>
);

export default SellerView;
