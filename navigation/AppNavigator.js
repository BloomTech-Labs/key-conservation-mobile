import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import {
  ConsNavigator,
  SupNavigator,
  LoginStack,
  UsernameStack,
  SearchStack
} from './MainNavigation';
import LoadingScreen from '../screens/LoadingScreen';

// This is the top level navigator for the app. It covers the loading process, and sorts the user into the version of the app they will be seeing.
export default createAppContainer(
  createSwitchNavigator({
    // First three routes deal with login / onboarding of users
    Loading: LoadingScreen,
    Login: LoginStack,
    CreateAccount: UsernameStack,
    Conservationist: ConsNavigator,
<<<<<<< HEAD
    // This is the tab navigator for supporters
    Supporter: SupNavigator
=======
    Supporter: SupNavigator,
    Search: SearchStack
>>>>>>> 8ceb558fd6a9f24f0a3c3dbff28eee2a86090019
  })
);
