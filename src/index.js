import React from "react";
import PropTypes from "prop-types";
import { Authenticator } from "aws-amplify-react"; // or 'aws-amplify-react-native';
import { Router, navigate } from "@reach/router";
import { reservedRoutes, getAuthComponent } from "./helpers";

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
const AmplifyRouter = ({
  children,
  componentOverrides,
  homeRoute = "/",
  hide = [],
  ...props
}) => {
  const overridenComponents = [...hide];

  const overrideChildren =
    componentOverrides &&
    componentOverrides.map((Tag, key) => {
      const instance = <Tag key={key} />;
      overridenComponents.push(
        getAuthComponent(Object.getPrototypeOf(instance.constructor).name)
      );

      return instance;
    });

  return (
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
          );
        } else {
          navigate(`/${kebabAuthState}`);
        }
      }}
      hide={overridenComponents}
      {...props}
    >
      {overrideChildren}
      <AuthorizedApp>{children}</AuthorizedApp>
    </Authenticator>
  );
};

AmplifyRouter.propTypes = {
  children: PropTypes.node,
  componentOverrides: PropTypes.array,
  homeRoute: PropTypes.string,
  hide: PropTypes.array
};

export default AmplifyRouter;
