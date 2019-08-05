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
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Loading: LoadingScreen,
    CreateAccount: UsernameStack,
    Login: LoginStack,
    Conservationist: TabNavigator,
    Supporter: NoTabNavigator
  })
);
