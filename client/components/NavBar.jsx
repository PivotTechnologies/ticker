import React from 'react';
import BuyerSearchBar from './buyer/BuyerSearchBar.jsx';
import UserAuth from './generalUser/UserAuth.jsx';
import UserProfile from './generalUser/UserProfile.jsx';
import SellerForm from './seller/SellerForm.jsx';

const NavBar = () => (
  <div>
    <BuyerSearchBar />
    <UserAuth />
    <UserProfile />
    <SellerForm />
  </div>
);

export default NavBar;
