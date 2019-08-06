import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import {
  TabNavigator,
  NoTabNavigator,
  LoginStack,
  UsernameStack
} from "./MainTabNavigator";
import LoadingScreen from "../screens/LoadingScreen";

export default createAppContainer(
  createSwitchNavigator({
        Loading: LoadingScreen,
    Login: LoginStack,
 CreateAccount: UsernameStack,
   
    Conservationist: TabNavigator,
    Supporter: NoTabNavigator
  })
);
