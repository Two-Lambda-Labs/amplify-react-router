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
  "confirm-signup",
  "require-new-password",
  "verify-contact"
];

export const getAuthComponent = proto => authComponents.find(component => proto instanceof component);
