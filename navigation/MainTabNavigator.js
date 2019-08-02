import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import FeedScreen from "../screens/FeedScreen";
import CreateCampScreen from "../screens/CreateCampScreen";
import ProScreen from "../screens/ProScreen";
import MyProScreen from "../screens/MyProScreen";
import CampScreen from "../screens/CampScreen";
import DetailScreen from "../screens/DetailScreen";
import MyDetailScreen from "../screens/MyDetailScreen";
import LoginScreen from "../screens/LoginScreen";
import UsernameScreen from "../screens/UsernameScreen";

import { Icon } from "react-native-elements";

const FeedStack = createStackNavigator(
  {
    Home: FeedScreen,
    Pro: { screen: ProScreen, navigationOptions: { title: "Profile" } },
    Detail: {
      screen: DetailScreen,
      navigationOptions: { title: "Details" }
    }
  },
  {
    navigationOptions: {
      tabBarLabel: "Feed",
      tabBarIcon: ({ focused }) => (
        <Icon
          color={focused ? "blue" : "black"}
          name="home"
          type="font-awesome"
        />
      )
    }
  }
);

const CreateCampStack = createStackNavigator(
  { CreateCampaign: CreateCampScreen },
  {
    navigationOptions: {
      tabBarLabel: "Create Campaign",
      tabBarIcon: ({ focused }) => (
        <Icon
          name="plus"
          color={focused ? "blue" : "black"}
          type="font-awesome"
        />
      )
    }
  }
);

// const FormStack = createStackNavigator(
//   { Form: UsernameScreen },
//   {
//     navigationOptions: {
//       tabBarLabel: "Form",
//       tabBarIcon: ({ focused }) => (
//         <Icon
//           name="heartbeat"
//           color={focused ? "blue" : "black"}
//           type="font-awesome"
//         />
//       )
//     }
//   }
// );

const MyProStack = createStackNavigator(
  {
    MyPro: { screen: MyProScreen, navigationOptions: { title: "My Profile" } },
    Campaign: CampScreen,
    MyDetail: {
      screen: MyDetailScreen,
      navigationOptions: { title: "My Details", headerLeft: null }
    }
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0
      }
    }),
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarIcon: ({ focused }) => (
        <Icon
          name="user"
          color={focused ? "blue" : "black"}
          type="font-awesome"
        />
      )
    }
  }
);

export const LoginStack = createStackNavigator(
  { Login: LoginScreen },
  {
    headerMode: "none"
  }
);

export const TabNavigator = createBottomTabNavigator(
  {
    FeedStack: { screen: FeedStack, path: "" },
    CreateCampStack: { screen: CreateCampStack, path: "" },
    MyProStack: { screen: MyProStack, path: "" }
    // FormStack: { screen: FormStack, path: "" }
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
);

export const NoTabNavigator = createStackNavigator(
  {
    FeedStack: { screen: FeedStack, path: "" },
    CreateCampStack: { screen: CreateCampStack, path: "" },
    MyProStack: { screen: MyProStack, path: "" },
    LoginStack: { screen: LoginStack, path: "" }
  },
  {
    headerMode: "none"
  }
);
