import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import FeedScreen from '../screens/FeedScreen';
import CreateCampScreen from '../screens/CreateCampScreen';
import ProScreen from '../screens/ProScreen';
import MyProScreen from '../screens/MyProScreen';
import EditProScreen from '../screens/EditProScreen';
import DetailScreen from '../screens/DetailScreen';
import MyDetailScreen from '../screens/MyDetailScreen';
import EditDetailScreen from '../screens/EditDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import UsernameScreen from "../screens/UsernameScreen";

import EditButton from '../components/EditButton';

import SvgUri from 'react-native-svg-uri';

const FeedStack = createStackNavigator(
  {
    Home: FeedScreen,
    Pro: {
      screen: ProScreen,
      navigationOptions: {
        title: 'Profile',
        headerTintColor: '#fff',
        headerTitleStyle: {
          textAlign: 'center',
          flexGrow: 1,
          alignSelf: 'center'
        },
        headerStyle: {
          backgroundColor: '#323338'
        }
      }
    },
    Detail: {
      screen: DetailScreen,
      navigationOptions: {
        title: 'Details',
        headerTintColor: '#fff',
        headerTitleStyle: {
          textAlign: 'center',
          flexGrow: 1,
          alignSelf: 'center'
        },
        headerStyle: {
          backgroundColor: '#323338'
        }
      }
    }
  },
  {
    navigationOptions: {
      tabBarLabel: "Feed",
      tabBarIcon: ({ focused }) => (
        <SvgUri
          width='25'
          height='25'
          source={
            focused
              ? require('../assets/icons/home-fill.svg')
              : require('../assets/icons/home.svg')
          }
        />
      )
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
      }
    })
  }
);

const CreateCampStack = createStackNavigator(
  { CreateCampaign: CreateCampScreen },
  {
    navigationOptions: {
      headerLeft: null,
      tabBarLabel: 'Create Campaign',
      tabBarIcon: ({ focused }) => (
        <SvgUri
          width='25'
          height='25'
          source={
            focused
              ? require('../assets/icons/plus-fill.svg')
              : require('../assets/icons/plus.svg')
          }
        />
      )
    }
  }
);
const MyProStack = createStackNavigator(
  {
    MyPro: { screen: MyProScreen },
    MyDetail: { screen: MyDetailScreen },
    EditPro: {
      screen: EditProScreen,
      navigationOptions: { title: 'Edit Profile' }
    },
    EditDetail: {
      screen: EditDetailScreen,
      navigationOptions: { title: 'Edit Details' }
    }
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0
      }
    }),
    navigationOptions: {
      tabBarLabel: 'My Profile',
      tabBarIcon: ({ focused }) => (
        <SvgUri
          width='25'
          height='25'
          source={
            focused
              ? require('../assets/icons/user-fill.svg')
              : require('../assets/icons/user.svg')
          }
        />
      )
    }
  }
);

export const UsernameStack = createStackNavigator({
  Username: {
    screen: UsernameScreen,

    navigationOptions: {
      title: "Sign Up",
      headerTitleStyle: {
        flex: 1,
        textAlign: "center",
        color: "white"
      },
      headerStyle: {
        backgroundColor: "#323338"
      }
    }
  }
});

export const LoginStack = createStackNavigator(
  { Login: LoginScreen },
  {
    headerMode: "none"
  }
);

export const TabNavigator = createBottomTabNavigator(
  {
    FeedStack: { screen: FeedStack, path: '' },
    CreateCampStack: { screen: CreateCampStack, path: '' },
    MyProStack: { screen: MyProStack, path: '' }
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
