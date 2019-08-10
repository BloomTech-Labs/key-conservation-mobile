import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import {
  ConsNavigator,
  SupNavigator,
  LoginStack,
  UsernameStack
} from './MainTabNavigator';
import LoadingScreen from '../screens/LoadingScreen';
import UploadPhoto from '../screens/UploadPhoto'

export default createAppContainer(
  createSwitchNavigator({
    // Upload: UploadPhoto, 
    Loading: LoadingScreen,
    Login: LoginStack,
    CreateAccount: UsernameStack,
    Conservationist: ConsNavigator,
    Supporter: SupNavigator
  })
);
