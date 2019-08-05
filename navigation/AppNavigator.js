import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import { TabNavigator, NoTabNavigator, LoginStack } from "./MainTabNavigator";
import UsernameScreen from "../screens/UsernameScreen";
import LoadingScreen from "../screens/LoadingScreen";

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  CreateAccount: UsernameScreen,
    Loading: LoadingScreen,
    Login: LoginStack,
    Conservationist: TabNavigator,
    Supporter: NoTabNavigator
  })
);
