# amplify-react-router
> Router Wrapper around the Authenticator from [aws-amplify-react](https://github.com/aws-amplify/amplify-js/tree/master/packages/aws-amplify-react/src/Auth)

![NPM](https://badge.fury.io/js/amplify-react-router.svg) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)
![Code Style](https://camo.githubusercontent.com/c83b8df34339bd302b7fd3fbb631f99ba25f87f8/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64655f7374796c652d70726574746965722d6666363962342e737667)
[![CircleCI](https://circleci.com/gh/Two-Lambda-Labs/amplify-react-router.svg?style=shield)](https://circleci.com/gh/Two-Lambda-Labs/amplify-react-router)

Having to rely on local `authState` is a pain the butt when you want to use a router as well as overriding the default components. This component makes that even easier now.

### Installation
```bash
npm install amplify-react-router aws-amplify-react aws-amplify @reach/router --save
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