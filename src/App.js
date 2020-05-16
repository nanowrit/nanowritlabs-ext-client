import { LinkContainer } from "react-router-bootstrap";
import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
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
    }
    catch(e) {
      if (e !== 'No current user') {
        console.log(e);
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
        <Navbar collapseOnSelect expand="md" variant="dark">
            <Navbar.Brand>
              <Link to="/" className="spanish-gray">Nanowrit Labs</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ml-auto">
              <LinkContainer to="/laboratory">
                <Nav.Link>Laboratory</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/library">
                <Nav.Link>Library</Nav.Link>
              </LinkContainer>
              {isAuthenticated ? (
                <>
                  <LinkContainer to="/settings">
                    <Nav.Link>Settings</Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
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