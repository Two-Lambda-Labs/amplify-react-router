import React from "react";
import PropTypes from "prop-types";
import { Authenticator } from "aws-amplify-react"; // or 'aws-amplify-react-native';
import { Router, navigate } from "@reach/router";

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
const AmplifyRouter = ({ children, componentOverrides, ...props }) => (
  <Authenticator
    authState={toCamelCase(window.location.pathname.substring(1))}
    onStateChange={authState =>
      navigate(authState !== "signedIn" ? toKebabCase(`/${authState}`) : "/")
    }
    {...props}
  >
    {componentOverrides}
    <AuthorizedApp>{children}</AuthorizedApp>
  </Authenticator>
);

AmplifyRouter.propTypes = {
  children: PropTypes.node,
  componentOverrides: PropTypes.array
};

export default AmplifyRouter;
