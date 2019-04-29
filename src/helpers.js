import {
  Greetings,
  SignIn,
  ConfirmSignIn,
  RequireNewPassword,
  SignUp,
  ConfirmSignUp,
  VerifyContact,
  ForgotPassword,
  TOTPSetup,
  Loading
} from "aws-amplify-react";

const authComponents = [Greetings,SignIn,ConfirmSignIn,RequireNewPassword,SignUp,ConfirmSignUp,VerifyContact,ForgotPassword,TOTPSetup,Loading];

// Current list of reserved routes from aws-amplify-react
export const reservedRoutes = [
  "sign-in",
  "sign-up",
  "forgot-password",
  "confirm-sign-up",
  "require-new-password",
  "verify-contact",
  "loading"
];


// Used for converting url pathname to authState friendly name
const toCamelCase = str => str.replace(/-([a-z])/g, (m, w) => w.toUpperCase());

// eslint-disable-next-line consistent-return
export const getInitAuthState = () => {
  // The current Route in the browser
  const currentRoute = window.location.pathname.substring(1);
  
  const reservedRoute = reservedRoutes.filter(route => route === currentRoute);

  // If we have are at a reserved route then we can simply just camel case and return
  if(reservedRoute.length > 0){
    return toCamelCase(currentRoute);
  }

  // Otherwise we return undefined meaning we don't know the initial state
};

export const getAuthComponent = proto => authComponents.find(component => proto instanceof component);
