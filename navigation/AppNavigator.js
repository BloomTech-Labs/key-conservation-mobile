import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { TabNavigator, NoTabNavigator, LoginStack } from './MainTabNavigator';
import FormScreen from '../screens/FormScreen';
import LoadingScreen from '../screens/LoadingScreen'

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Loading: LoadingScreen,
    Login: LoginStack,
    CreateAccount: FormScreen,
    Conservationist: TabNavigator,
    Supporter: NoTabNavigator
  })
);
