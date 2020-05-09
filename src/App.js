import { LinkContainer } from "react-router-bootstrap";
import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { Auth } from "aws-amplify";
import config from "./config";
import Footer from "./components/Footer";
// import { AppContext } from "./libs/contextLib";
import { onError } from "./libs/errorLib";

function App(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAdmin, userConfirmedAdmin] = useState(false);

  useEffect(() => {
    onLoad();
    loadFacebookSDK();
  }, []);
  
  async function loadFacebookSDK() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId            : config.social.FB,
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v3.1'
      });
    };
  
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
      let user = await Auth.currentAuthenticatedUser();
      if (user.signInUserSession.accessToken.payload['cognito:groups'][0] === "Admin") {
        userConfirmedAdmin(true);
      }
      // console.log(user.signInUserSession.accessToken.payload['cognito:groups'][0]);
      // console.log(user);
    }
    catch(e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }
  
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
  
    userHasAuthenticated(false);

    props.history.push("/login");
  }

  return (
    !isAuthenticating && (
      <div className="App container" id="AppContainer">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Nanowrit Labs</Link>
            </Navbar.Brand>
            <h4 className="pale-silver">beta version</h4>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <LinkContainer to="/laboratory">
                <NavItem>Laboratory</NavItem>
              </LinkContainer>
              <LinkContainer to="/library">
                <NavItem>Library</NavItem>
              </LinkContainer>
              {isAuthenticated ? (
                <>
                  <LinkContainer to="/settings">
                    <NavItem>Settings</NavItem>
                  </LinkContainer>
                  <NavItem onClick={handleLogout}>Logout</NavItem>
                </>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes appProps={{ 
          isAuthenticated, userHasAuthenticated, 
          isAdmin, userConfirmedAdmin
        }} />
        <Footer />
      </div>
    )
  );
}

export default withRouter(App);