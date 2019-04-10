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

export const reservedRoutes = [
  "sign-in",
  "sign-up",
  "forgot-password",
  "confirm-signup"
];

export const getAuthComponent = name => authComponents.find(component => component.name === name);
