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

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => <Icon name='home' type='font-awesome' />
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => <Icon name='plus' type='font-awesome' />
};

LinksStack.path = '';

const ProStack = createStackNavigator({
  Pro: ProScreen,
  Feed: {
    screen: CampScreen // here
  },
  Detail: {
    screen:  DetailScreen
  }
});

ProStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => <Icon name='user' type='font-awesome' />
};

ProStack.path = '';

const CampStack = createStackNavigator(
  {
    Camp: CampScreen
  },
  config
);

CampStack.navigationOptions = {
  tabBarLabel: 'Campaign'
};

CampStack.path = '';

const NavigationOptions = createStackNavigator({
  CampStack
});

NavigationOptions.path = '';

// const ProStack = createStackNavigator({
//   Profile: {
//     screen: CampScreen
//   },
//   DetailScreen: {
//     screen: Detail
//   }
// })

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    LinksStack,
    ProStack
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        header: null,
        headerTitle: routeName
      };
    }
  }
);

tabNavigator.path = '';

export default tabNavigator;
