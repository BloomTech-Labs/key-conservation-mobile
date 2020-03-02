import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import CanScreen from '../screens/org-onboarding-screens/CanScreen';
import CantScreen from '../screens/org-onboarding-screens/CantScreen';
import HeyThereScreen from '../screens/org-onboarding-screens/HeyThereScreen';
import KeyConservationScreen from '../screens/org-onboarding-screens/KeyConservationScreen';
import MakeAccountScreen from '../screens/org-onboarding-screens/MakeAccountScreen';
import TellAboutOrganizationScreen from '../screens/org-onboarding-screens/TellAboutOrganizationScreen';
import ToExpectScreen from '../screens/org-onboarding-screens/ToExpectScreen';
import VerifyDocumentationScreen from '../screens/org-onboarding-screens/VerifyDocumentationScreen';
import TellMoreScreen from '../screens/org-onboarding-screens/TellMoreScreen';
import AlmostDone from '../screens/org-onboarding-screens/AlmostDoneScreen';
import ThankYouScreen from '../screens/org-onboarding-screens/ThankYouScreen';
import ReviewYourInfoScreen from '../screens/org-onboarding-screens/ReviewYourInfoScreen';
import AccountScreen from '../screens/org-onboarding-screens/AccountScreen';

import FeedScreen from '../screens/FeedScreen';
import CreateCampScreen from '../screens/CreateCampScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProScreen from '../screens/EditProScreen';
import LoginScreen from '../screens/LoginScreen';
import NameScreen from '../screens/NameScreen';
import SearchScreen from '../screens/SearchScreen';
import ViewCampScreen from '../screens/ViewCampScreen';
import EditCampScreen from '../screens/EditCampScreen';
import EditSupProScreen from '../screens/EditSupProScreen';
import ViewCampUpdateScreen from '../screens/ViewCampUpdateScreen';
import CreateCampUpdateScreen from '../screens/CreateCampUpdateScreen';
import EditCampUpdateScreen from '../screens/EditCampUpdateScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';
import WideMapScreen from '../screens/maps/WideMapScreen';
import AdminReportScreen from '../screens/AdminReportScreen';
import ReportDetailScreen from '../screens/ReportDetailScreen';
import CreateReportScreen from '../screens/CreateReportScreen';
import LogoutScreen from '../screens/LogoutScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ConnectionsScreen from '../screens/Connections/ConnectionsScreen';
import SelectedConnectionsScreen from '../screens/Connections/SelectedConnectionsScreen';

//icon imports

import Lightening from '../assets/jsicons/bottomnavigation/Lightening';
import Globe from '../assets/jsicons/bottomnavigation/Globe';
import Smile from '../assets/jsicons/bottomnavigation/Smile';

export const OrgOnboardStack = createStackNavigator(
  {
    HeyThere: HeyThereScreen,
    ToExpect: ToExpectScreen,
    KeyConservation: KeyConservationScreen,
    Can: CanScreen,
    Cant: CantScreen,
    MakeAccount: MakeAccountScreen,
    TellAboutOrganization: TellAboutOrganizationScreen,
    VerifyDocumentation: VerifyDocumentationScreen,
    TellMore: TellMoreScreen,
    AlmostDone: AlmostDone,
    ThankYou: ThankYouScreen,
    ReviewYourInfo: ReviewYourInfoScreen,
    AccountScreen: AccountScreen,
    Welcome: WelcomeScreen
  },
  {
    headerMode: 'none'
  }
);

const MapStack = createStackNavigator(
  {
    MapHome: WideMapScreen
  },
  {
    navigationOptions: {
      tabBarLabel: 'Map',
      tabBarIcon: ({ focused }) => <Globe />
    }
  }
);

const FeedStack = createStackNavigator(
  {
    Home: FeedScreen,
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        header: null
      }
    },
    Pro: {
      screen: ProfileScreen,
      navigationOptions: {
        headerTransparent: true,
        headerTintColor: '#fff'
      }
    },
    Connections: { screen: ConnectionsScreen },
    SelectedConnections: { screen: SelectedConnectionsScreen },
    Camp: ViewCampScreen,
    CampUpdate: ViewCampUpdateScreen,
    SupPro: ProfileScreen,
    CreateReport: CreateReportScreen,
    EditCamp: EditCampScreen,
    EditCampUpdate: EditCampUpdateScreen,
    CreateCampaign: CreateCampScreen,
    CreateCampUpdate: CreateCampUpdateScreen
  },
  {
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ focused }) => <Lightening />
    }
  }
);

export const AccountSettingsStack = createStackNavigator({
  AccountSettings: AccountSettingsScreen,
  AdminScreen: AdminReportScreen,
  ReportScreen: ReportDetailScreen,
  SupProDetails: ProfileScreen,
  ProDetails: ProfileScreen,
  Connections: ConnectionsScreen,
  SelectedConnections: SelectedConnectionsScreen
});

const MyProStack = createStackNavigator(
  {
    Pro: {
      screen: ProfileScreen
    },
    MyPro: {
      screen: ProfileScreen
    },
    EditPro: {
      screen: EditProScreen,
      navigationOptions: { title: 'Edit Profile' }
    },
    Camp: ViewCampScreen,
    EditCamp: EditCampScreen,
    CampUpdate: ViewCampUpdateScreen,
    CreateCampUpdate: CreateCampUpdateScreen,
    EditCampUpdate: EditCampUpdateScreen,
    CreateReport: CreateReportScreen
  },
  {
    navigationOptions: {
      tabBarLabel: 'My Profile',
      tabBarIcon: ({ focused }) => <Smile />
    }
  }
);

const MySupProStack = createStackNavigator(
  {
    MySupPro: { screen: ProfileScreen },
    EditSupPro: { screen: EditSupProScreen },
    Connections: { screen: ConnectionsScreen }
  },
  {
    navigationOptions: {
      tabBarLabel: 'My Profile',
      tabBarIcon: ({ focused }) => <Smile />,
      transitionSpec: {
        duration: 0
      }
    }
  }
);

export const NameStack = createStackNavigator({
  Name: {
    screen: NameScreen,

    navigationOptions: {
      title: 'Sign Up',
      headerStyle: {
        borderWidth: 2,
        backgroundColor: '#323338'
      }
    }
  }
});

export const LoginStack = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    ResetPassword: { screen: ResetPasswordScreen }
  },
  {
    headerMode: 'none'
  }
);

export const LogoutStack = createStackNavigator(
  { Logout: LogoutScreen },
  {
    headerMode: 'none'
  }
);

export const ConsNavigator = createBottomTabNavigator(
  {
    FeedStack: {
      screen: FeedStack,
      path: ''
    },
    MapStack: {
      screen: MapStack
    },
    MyProStack: {
      screen: MyProStack,
      path: ''
    }
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeBackgroundColor: '#EAEAEA',
      style: {
        borderTopColor: 'transparent'
      },
      tabStyle: {
        borderRightColor: '#EAEAEA',
        borderRightWidth: 1,
        borderRightHeight: 10,
        borderLeftColor: '#EAEAEA',
        borderLeftWidth: 1,
        borderLeftHeight: 10
      }
    }
  }
);

export const SupNavigator = createBottomTabNavigator(
  {
    FeedStack: {
      screen: FeedStack,
      path: ''
    },
    MapStack: {
      screen: MapStack
    },
    MySupProStack: {
      screen: MySupProStack,
      path: ''
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      activeBackgroundColor: '#EAEAEA',
      style: {
        borderTopColor: 'transparent'
      },
      tabStyle: {
        borderRightColor: '#EAEAEA',
        borderRightWidth: 1,
        borderRightHeight: 10,
        borderLeftColor: '#EAEAEA',
        borderLeftWidth: 1,
        borderLeftHeight: 10
      }
    }
  }
);
