import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import FeedScreen from '../screens/FeedScreen';
import CreateCampScreen from '../screens/CreateCampScreen';
import ProScreen from '../screens/ProScreen';
import MyProScreen from '../screens/MyProScreen';
import EditProScreen from '../screens/EditProScreen';
import DetailScreen from '../screens/DetailScreen';
import MyDetailScreen from '../screens/MyDetailScreen';
import MySupProScreen from '../screens/MySupProScreen';
import LoginScreen from '../screens/LoginScreen';
import UsernameScreen from '../screens/UsernameScreen';
import SvgUri from 'react-native-svg-uri';
import SearchScreen from '../screens/SearchScreen';
import ViewCampScreen from '../screens/ViewCampScreen';
import EditCampScreen from '../screens/EditCampScreen';
import EditSupProScreen from '../screens/EditSupProScreen';

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
    Camp: ViewCampScreen
  },
  {
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ focused }) => (
        <SvgUri
          fill='#3b3b3b'
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
        duration: 0
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
          fill='#3b3b3b'
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
    // EditDetail: {
    //   screen: EditDetailScreen,
    //   navigationOptions: { title: 'Edit Details' }
    // },
    Camp: ViewCampScreen,
    EditCamp: EditCampScreen
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
          fill='#3b3b3b'
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

const SupProStack = createStackNavigator(
  {
    MySupPro: { screen: MySupProScreen },
    EditSupPro: { screen: EditSupProScreen }
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
          fill='#3b3b3b'
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
      title: 'Sign Up',
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
        color: 'white'
      },
      headerStyle: {
        backgroundColor: '#323338'
      }
    }
  }
});

export const LoginStack = createStackNavigator(
  { Login: LoginScreen },
  {
    headerMode: 'none'
  }
);

export const SearchStack = createStackNavigator(
  {
    Search: SearchScreen
  },
  {
    headerMode: 'none'
  }
);

export const ConsNavigator = createBottomTabNavigator(
  {
    FeedStack: {
      screen: FeedStack,
      path: '',
      navigationOptions: {
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.navigate('Home'), defaultHandler();
        }
      }
    },
    CreateCampStack: { screen: CreateCampStack, path: '' },
    MyProStack: {
      screen: MyProStack,
      path: '',
      navigationOptions: {
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.navigate('MyPro'), defaultHandler();
        }
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
);

export const SupNavigator = createBottomTabNavigator(
  {
    FeedStack: {
      screen: FeedStack,
      path: '',
      navigationOptions: {
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.navigate('Home'), defaultHandler();
        }
      }
    },
    SupProStack: {
      screen: SupProStack,
      path: '',
      navigationOptions: {
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.navigate('MySupPro'), defaultHandler();
        }
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
);
