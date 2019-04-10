# amplify-react-router
> Router Wrapper around the Authenticator from [aws-amplify-react](https://github.com/aws-amplify/amplify-js/tree/master/packages/aws-amplify-react/src/Auth)

Having to rely on local `authState` is a pain the butt when you want to use a router as well as overriding the default components. This component makes that even easier now.

### Installation
```bash
npm install amplify-react-router --save
```

### Usage
```javascript
import React from 'react';
import AmplifyRouter from 'amplify-reacr-router';

import MySignIn from './SignIn';
import Page from './Page';
import awsExports from './aws-exports';

export default () => (
    <AmplifyRouter
        amplifyConfig={awsExports}
        homeRoute="/home"
        componentOverrides={[MySignIn]}
    >
        <Page path="/home" />
    </AmplifyRouter>
);

```

You no longer have to pass in the `hide` property for components you want to override. Only pass in the components to the `hide` prop that you want to actually hide.

All overriden components should be placed in the `componentOverrides` and will auto hide their super class
s component.


### Props
All the base [Authenticator](https://aws-amplify.github.io/docs/js/authentication) Props plus the below.

| Prop Name | Types | Default | Description |
| --- | --- | --- | --- | 
|**`componentOverrides`**| Array(Component)| Optional | The auth components you want to override |
|**`homeRoute`**| String | / | The home route to navigate to when once signed in 