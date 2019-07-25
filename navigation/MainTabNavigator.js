import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import FeedScreen from '../screens/FeedScreen';
import CreateCampScreen from '../screens/CreateCampScreen';
import ProScreen from '../screens/ProScreen';
import CampScreen from '../screens/CampScreen';
import DetailScreen from '../screens/DetailScreen';

import { Icon } from 'react-native-elements';

const FeedStack = createStackNavigator(
  { Home: FeedScreen },
  {
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ focused }) => <Icon name='home' type='font-awesome' />
    }
  }
);

const CreateCampStack = createStackNavigator(
  { CreateCampaign: CreateCampScreen },
  {
    navigationOptions: {
      tabBarLabel: 'Create Campaign',
      tabBarIcon: ({ focused }) => <Icon name='plus' type='font-awesome' />
    }
  }
);

const ProStack = createStackNavigator(
  {
    Pro: ProScreen,
    Campaign: CampScreen,
    Detail: DetailScreen
  },
  {
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ focused }) => <Icon name='user' type='font-awesome' />
    }
  }
);

export const TabNavigator = createBottomTabNavigator({
  FeedStack: { screen: FeedStack, path: '' },
  CreateCampStack: { screen: CreateCampStack, path: '' },
  ProStack: { screen: ProStack, path: '' }
});

export const NoTabNavigator = createStackNavigator({
  FeedStack: { screen: FeedStack, path: '' },
  CreateCampStack: { screen: CreateCampStack, path: '' },
  ProStack: { screen: ProStack, path: '' }
});
