import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FaceIcon from 'material-ui/svg-icons/action/face';
import FlatButton from 'material-ui/FlatButton';

class NavBar extends React.Component {
  renderRightElement() {
    if (true){//(localStorage.getItem('userToken')) { // IF LOGGED IN, SHOW ACCOUNT STUFF
      return (
        <IconMenu
          iconButtonElement={
            <IconButton><FaceIcon /></IconButton>
          }
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText="My Account" />
          <MenuItem primaryText="Sign Out" />
        </IconMenu>
      );
    }
    // IF NOT LOGGED IN, SHOW SIGNIN/SIGNUP BUTTON
    return (
      <FlatButton label="Sign In / Sign Up" />
    );
  }

  render() {
    return (
      <AppBar
        title="ticker"
        iconElementLeft={
          <IconMenu
            iconButtonElement={
              <IconButton><FaceIcon /></IconButton>
            }
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          >
            <MenuItem primaryText="My Account" />
            <MenuItem primaryText="Sign Out" />
          </IconMenu>
        }
        iconElementRight={this.renderRightElement()}
      />
    );
  }

}

export default NavBar;

// <a href="/"><h1>ticker</h1></a>
// <a href="/signup">Sign Up</a>
// <a href="/signin">Sign In</a>
// <a href="/account">My Account</a>
// <a href="/">Find Tickets</a>
// <a href="/sell">Sell Tickets</a>
