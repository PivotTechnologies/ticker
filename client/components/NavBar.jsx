import React from 'react';
import AppBar from 'material-ui/AppBar';
import { ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FaceIcon from 'material-ui/svg-icons/action/face';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearEvents, signout } from '../actions/index';
import { browserHistory } from 'react-router';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
    };

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.routeToBuyerSearch = this.routeToBuyerSearch.bind(this);
    this.routeToSellerSearch = this.routeToSellerSearch.bind(this);
  }

  openMenu(event) {
    this.setState({ menuOpen: true });
  }

  closeMenu(event) {
    this.setState({ menuOpen: false });
  }

  routeToBuyerSearch(event) {
    this.props.clearEvents();
    browserHistory.push('/');
  }

  routeToSellerSearch(event) {
    this.props.clearEvents();
    browserHistory.push('/sell');
  }

  routeToAuth(event) {
    browserHistory.push('/signin');
  }

  routeToUserProfile(event) {
    browserHistory.push('/account');
  }

  signOut(event) {
    this.props.signout();
    this.routeToAuth();
  }

  renderRightElement() {
    if (localStorage.getItem('token')) {
      return (
        <IconMenu
          iconButtonElement={
            <IconButton><FaceIcon /></IconButton>
          }
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem
            primaryText="My Account"
            onTouchTap={this.routeToUserProfile}
          />
          <MenuItem
            primaryText="Sign Out"
            onTouchTap={(event) => {
              this.signOut();
            }}
          />
        </IconMenu>
      );
    }

    return (
      <FlatButton
        label="Sign In"
        onClick={this.routeToAuth}
      />
    );
  }

  render() {
    return (
      <div>
        <AppBar
          className="nav-bar"
          title={
            <div className="navbar-title">
              ticker
            </div>
          }
          onTitleTouchTap={this.routeToBuyerSearch}
          onLeftIconButtonTouchTap={this.openMenu}
          iconElementRight={this.renderRightElement()}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.menuOpen}
          onRequestChange={this.closeMenu}
        >
          <AppBar
            title="Actions"
            showMenuIconButton={false}
          />
          <MenuItem
            primaryText="Find Tickets"
            onTouchTap={(event) => {
              this.closeMenu();
              this.routeToBuyerSearch();
            }}
          />
          <MenuItem
            primaryText="Sell Tickets"
            onTouchTap={(event) => {
              this.closeMenu();
              this.routeToSellerSearch();
            }}
          />
        </Drawer>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clearEvents, signout }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
