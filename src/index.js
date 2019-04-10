import React from "react";
import PropTypes from "prop-types";
import { Authenticator } from "aws-amplify-react"; // or 'aws-amplify-react-native';
import { Router, navigate } from "@reach/router";

const reservedRoutes = [
  "sign-in",
  "sign-up",
  "forgot-password",
  "confirm-signup"
]

// Used for converting the authState to url friendly name
const toKebabCase = str =>
  str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

// Used for converting url pathname to authState friendly name
const toCamelCase = str => str.replace(/-([a-z])/g, (m, w) => w.toUpperCase());

// Wrapper for the Authorized Router
const AuthorizedApp = ({ authState, children }) =>
  authState === "signedIn" ? <Router>{children}</Router> : null;
AuthorizedApp.propTypes = {
  children: PropTypes.node,
  authState: PropTypes.string
};

// The Component
const AmplifyRouter = ({ children, componentOverrides, homeRoute = "/", ...props }) => (
  <Authenticator
    authState={toCamelCase(window.location.pathname.substring(1))}
    onStateChange={authState => {
      const kebabAuthState = toKebabCase(authState);
      const currentRoute = window.location.pathname.substring(1);
      if (authState === "signedIn") {
        navigate(
          reservedRoutes.find(route => route === currentRoute)
            ? homeRoute
            : window.location.pathname
        )
      } else {
        navigate(`/${kebabAuthState}`)
      }
    }}
    {...props}
  >
    {componentOverrides && componentOverrides.map((Tag,key) => <Tag key={key}/>)}
    <AuthorizedApp>{children}</AuthorizedApp>
  </Authenticator>
);

AmplifyRouter.propTypes = {
  children: PropTypes.node,
  componentOverrides: PropTypes.array,
  homeRoute: PropTypes.string
};

export default AmplifyRouter;
