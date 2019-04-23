import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Authenticator } from "aws-amplify-react" // or 'aws-amplify-react-native';
import { Router, navigate } from "@reach/router"
import { reservedRoutes, getAuthComponent, getInitAuthState } from "./helpers"
// Used for converting the authState to url friendly name
const toKebabCase = str => str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()

// Wrapper for the Authorized Router
const AuthorizedApp = ({ authState, children }) => authState === "signedIn" ? <Router>{children}</Router> : null

AuthorizedApp.propTypes = {
  children: PropTypes.node,
  authState: PropTypes.string
}

let originalPath = null

const getRoute = homeRoute => originalPath || homeRoute

// The Component switch
const AmplifyRouter = ({
  children,
  componentOverrides,
  homeRoute = "/",
  hide = [],
  ...props
}) => {
  const overridenComponents = [...hide]

  const overrideChildren =
    componentOverrides &&
    componentOverrides.map((Tag, key) => {
      overridenComponents.push(getAuthComponent(Tag.prototype))

      return <Tag key={key} />
    })

  useEffect(() => {
    const initPath = window.location.pathname.substring(1)
    if (!reservedRoutes.find(route => route === initPath)) {
      originalPath = initPath
    }
  }, []);


  return (
    <Authenticator
      authState={getInitAuthState()}
      onStateChange={authState => {
        const kebabAuthState = toKebabCase(authState)
        const currentRoute = window.location.pathname.substring(1)
        if (authState === "signedIn") {
          navigate(
            reservedRoutes.find(route => route === currentRoute)
              ? getRoute(homeRoute)
              : window.location.pathname
          )
        } else {
          navigate(`/${kebabAuthState}`)
        }
      }}
      hide={overridenComponents}
      {...props}
    >
      {overrideChildren}
      <AuthorizedApp>{children}</AuthorizedApp>
    </Authenticator>
  )
}

AmplifyRouter.propTypes = {
  children: PropTypes.node,
  componentOverrides: PropTypes.array,
  homeRoute: PropTypes.string,
  hide: PropTypes.array
}

export default AmplifyRouter
