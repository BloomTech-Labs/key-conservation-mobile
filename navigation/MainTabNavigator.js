import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import FeedScreen from '../screens/FeedScreen';
import CreateCampScreen from '../screens/CreateCampScreen';
import ProScreen from '../screens/ProScreen';
import MyProScreen from '../screens/MyProScreen';
import EditProScreen from '../screens/EditProScreen';
import CampScreen from '../screens/CampScreen';
import DetailScreen from '../screens/DetailScreen';
import MyDetailScreen from '../screens/MyDetailScreen';
import EditDetailScreen from '../screens/EditDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import FormScreen from '../screens/FormScreen';

import EditButton from '../components/EditButton';

import { Icon } from 'react-native-elements';

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
      screen: MyDetailScreen, // not being used
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
      tabBarLabel: 'Feed',
      tabBarIcon: ({ focused }) => (
        <Icon
          color={focused ? '#00FF9D' : 'black'}
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
      headerLeft: null,
      tabBarLabel: 'Create Campaign',
      tabBarIcon: ({ focused }) => (
        <Icon
          name='plus'
          color={focused ? '#00FF9D' : 'black'}
          type='font-awesome'
        />
      )
    }
  }
);

const FormStack = createStackNavigator(
  { Form: FormScreen },
  {
    navigationOptions: {
      tabBarLabel: 'Form',
      tabBarIcon: ({ focused }) => (
        <Icon
          name='heartbeat'
          color={focused ? '#00FF9D' : 'black'}
          type='font-awesome'
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
    },
    Campaign: CampScreen
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
        <Icon
          name='user'
          color={focused ? '#00FF9D' : 'black'}
          type='font-awesome'
        />
      )
    }
  }
);

export const LoginStack = createStackNavigator(
  { Login: LoginScreen },
  {
    headerMode: 'none'
  }
);

export const TabNavigator = createBottomTabNavigator(
  {
    FeedStack: { screen: FeedStack, path: '' },
    CreateCampStack: { screen: CreateCampStack, path: '' },
    MyProStack: { screen: MyProStack, path: '' }
    //FormStack: { screen: FormStack, path: '' }
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
);

export const NoTabNavigator = createStackNavigator(
  {
    FeedStack: { screen: FeedStack, path: '' },
    CreateCampStack: { screen: CreateCampStack, path: '' },
    MyProStack: { screen: MyProStack, path: '' },
    LoginStack: { screen: LoginStack, path: '' }
  },
  {
    headerMode: 'none'
  }
);
