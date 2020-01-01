import React from "react";
import { connect } from "react-redux";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { logout } from "../../actions/user";
import { HashLink as Link } from "react-router-hash-link";
import styled from "styled-components";
//ICONS
import InboxIcon from "@material-ui/icons/MoveToInbox";
import HomeIcon from "@material-ui/icons/Home";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import InfoIcon from "@material-ui/icons/Info";

const SideNavBar = ({ user, logout }) => {
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ left: open });
  };

  const sideList = side => (
    <SideMenu
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <Link smooth to="/#top">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon color="action" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link to="/about">
          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
        </Link>
        <Link to="/contact">
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
        </Link>
        {user.user && user.user.isAdmin ? (
          <Link to="/addpost">
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Add post" />
            </ListItem>
          </Link>
        ) : (
          ""
        )}
      </List>
      <Divider />
      <List>
        {user.isAuthenticated ? (
          <Link to="/" onClick={e => logout()}>
            <ListItem button>
              <ListItemIcon>
                <LockOpenIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </Link>
        ) : (
          <div>
            <Link smooth to="/login#login">
              <ListItem button>
                <ListItemIcon>
                  <LockOpenIcon />
                </ListItemIcon>
                <ListItemText primary="login" />
              </ListItem>
            </Link>
            <Link smooth to="/register#register">
              <ListItem button>
                <ListItemIcon>
                  <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText primary="Register" />
              </ListItem>
            </Link>
          </div>
        )}
      </List>
    </SideMenu>
  );

  return (
    <div>
      <Navbar>
        <i className="fas fa-bars bars" onClick={toggleDrawer("left", true)} />

        <div className="hello">
          {user.user ? (
            <div>
              <span>Hello, {user.user.name}</span>
            </div>
          ) : (
            ""
          )}
        </div>
      </Navbar>

      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {sideList("left")}
      </SwipeableDrawer>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

const Navbar = styled.div`
  display: none;
  @media (max-width: 575.98px) {
    display: flex;
    justify-content: space-between;
    background-color: #333333be;
    position: fixed;
    width: 100%;
    height: 3em;
    z-index: 1;
    .bars {
      color: white;
      margin-left: 1em;
      margin-top: 0.5em;
      font-size: 1.5em;
    }
    .hello {
      display: block;
      color: white;
      margin: 0.8em;
    }
  }
`;

const SideMenu = styled.div`
  width: 250px;
`;
export default connect(mapStateToProps, { logout })(SideNavBar);
