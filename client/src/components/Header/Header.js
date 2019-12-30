import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/user";
import SideNavBar from "../SideNavBar/SideNavBar";
import { HashLink } from "react-router-hash-link-offset";
import styled from "styled-components";

const Header = ({ user, logout }) => {
  return (
    <div id="top">
      <SideNavBar />
      <Hader>
        <Sticky>
          <Navbar>
            <ul>
              <li>
                <HashLink smooth to="/#top">
                  HOME
                </HashLink>
              </li>
              <li>
                <HashLink scrollOffset={-20} smooth to="about#about">
                  ABOUT
                </HashLink>
              </li>
              {user.user && user.user.isAdmin ? (
                <li>
                  <Link to="/addpost">ADD POST</Link>
                </li>
              ) : (
                ""
              )}
              <li>
                <HashLink smooth to="/Contact#contact">
                  CONTACT
                </HashLink>
              </li>
            </ul>

            <ul>
              {user.user ? (
                <>
                  <li className="greeting">{`Hello ${user.user.name}  `}</li>
                  <li className="greeting">
                    <Link to="/" onClick={e => logout()}>
                      LOGOUT
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <HashLink smooth to="/login#login">
                      LOGIN
                    </HashLink>
                  </li>
                  <li>
                    <HashLink smooth to="/register#register">
                      REGISTER
                    </HashLink>
                  </li>
                </>
              )}
            </ul>
          </Navbar>
        </Sticky>

        <h1 className="logo">MY-STORY</h1>
      </Hader>
    </div>
  );
};
const mapStateToProps = state => ({
  user: state.user
});

const Hader = styled.div`
  height: 100vh;

  .logo {
    font-family: "Inria Serif", serif;
    font-weight: bold;
    margin: 0 auto;
    font-size: 4rem;
    line-height: 100vh;
    text-align: center;
    color: #f1faee;
    animation: App-logo-spin 0.8s ease-out;
    height: 40vmin;

    @keyframes App-logo-spin {
      from {
        transform: scaleY(-2);
      }
      to {
        transform: scaleY(1);
      }
    }
  }

  &::after {
    content: "";
    background: url(https://cdn.pixabay.com/photo/2016/03/12/23/18/man-1253004_960_720.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    opacity: 0.8;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }
`;
const Sticky = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #2c2c2c;
  height: 4em;
  overflow: hidden;
  z-index: 99;

  @media (max-width: 767.98px) {
    display: none;
  }
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.2em 3em;
  height: 4em;
  ul {
    display: flex;
    height: 3.8em;
    align-items: center;
  }
  ul li a {
    font-family: "Cairo", sans-serif;
    padding-right: 2.5em;
    color: #dcdcdd;
    font-size: 1em;
  }
  ul li a:hover {
    color: #f1faee;
  }
  .greeting {
    font-family: "Cairo", sans-serif;
    padding-left: 1em;
    color: #dcdcdd;
    font-size: 1em;
  }
`;

export default connect(mapStateToProps, { logout })(Header);
