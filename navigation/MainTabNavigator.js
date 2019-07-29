import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import FeedScreen from '../screens/FeedScreen';
import CreateCampScreen from '../screens/CreateCampScreen';
import ProScreen from '../screens/ProScreen';
import CampScreen from '../screens/CampScreen';
import DetailScreen from '../screens/DetailScreen';
import LoginScreen from '../screens/LoginScreen';
// import {
//   FeedScreen,
//   CreateCampScreen,
//   ProScreen,
//   CampScreen,
//   DetailScreen,
//   LoginScreen
// } from '../screens';

import { Icon } from 'react-native-elements';

export const LoginStack = createStackNavigator({ Login: LoginScreen });

const FeedStack = createStackNavigator(
  {
    Home: FeedScreen,
    Pro: { screen: ProScreen, navigationOptions: { title: 'Profile' } },
    Campaign: CampScreen,
    Detail: {
      screen: DetailScreen,
      navigationOptions: { title: 'Details', headerLeft: null }
    }
  },
  {
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ focused }) => (
        <Icon
          color={focused ? 'blue' : 'black'}
          name='home'
          type='font-awesome'
        />
      )
    }
  }
);

const CreateCampStack = createStackNavigator(
  { CreateCampaign: CreateCampScreen },
  {
    navigationOptions: {
      tabBarLabel: 'Create Campaign',
      tabBarIcon: ({ focused }) => (
        <Icon
          name='plus'
          color={focused ? 'blue' : 'black'}
          type='font-awesome'
        />
      )
    }
  }
);

const ProStack = createStackNavigator(
  {
    Pro: { screen: ProScreen, navigationOptions: { title: 'Profile' } },
    Campaign: CampScreen,
    Detail: {
      screen: DetailScreen,
      navigationOptions: { title: 'Details', headerLeft: null }
    }
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0
      }
    }),
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ focused }) => (
        <Icon
          name='user'
          color={focused ? 'blue' : 'black'}
          type='font-awesome'
        />
      )
    }
  }
);

export const TabNavigator = createBottomTabNavigator(
  {
    FeedStack: { screen: FeedStack, path: '' },
    CreateCampStack: { screen: CreateCampStack, path: '' },
    ProStack: { screen: ProStack, path: '' }
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
);

export const NoTabNavigator = createStackNavigator({
  FeedStack: { screen: FeedStack, path: '' },
  CreateCampStack: { screen: CreateCampStack, path: '' },
  ProStack: { screen: ProStack, path: '' },
  LoginStack: { screen: LoginStack, path: '' }
});
