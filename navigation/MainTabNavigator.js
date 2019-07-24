import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import ProScreen from '../screens/ProScreen';
import CampScreen from '../screens/CampScreen';
import DetailScreen from '../screens/DetailScreen';

import { Icon } from 'react-native-elements';

const HomeStack = createStackNavigator(
  { Home: HomeScreen },
  {
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ focused }) => <Icon name='home' type='font-awesome' />
    }
  }
);

const LinksStack = createStackNavigator(
  { CreatePost: LinksScreen },
  {
    navigationOptions: {
      tabBarLabel: 'Create Post',
      tabBarIcon: ({ focused }) => <Icon name='plus' type='font-awesome' />
    }
  }
);

const ProStack = createStackNavigator(
  {
    Pro: ProScreen,
    Feed: CampScreen,
    Detail: DetailScreen
  },
  {
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ focused }) => <Icon name='user' type='font-awesome' />
    }
  }
);

export const TabNavigator = createBottomTabNavigator(
  {
    HomeStack: { screen: HomeStack, path: '' },
    LinksStack: { screen: LinksStack, path: '' },
    ProStack: { screen: ProStack, path: '' }
  }
);

export const NoTabNavigator = createStackNavigator(
  {
    HomeStack: { screen: HomeStack, path: '' },
    LinksStack: { screen: LinksStack, path: '' },
    ProStack: { screen: ProStack, path: '' }
  }
);
