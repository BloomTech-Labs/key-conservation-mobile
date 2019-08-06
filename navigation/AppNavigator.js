import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { TabNavigator, NoTabNavigator, LoginStack } from './MainTabNavigator';
import FormScreen from '../screens/FormScreen';

export default createAppContainer(
  createSwitchNavigator({
    //Login: LoginStack,
    //CreateAccount: FormScreen,
    Conservationist: TabNavigator,
    Supporter: NoTabNavigator
  })
);
