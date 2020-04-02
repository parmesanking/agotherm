import App from './App';
import * as Expo from 'expo';
import React from 'react';

const AwakeInDevApp = props => [
  <App key="app" {...props} />
];
Expo.registerRootComponent(AwakeInDevApp);