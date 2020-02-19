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
import ProScreen from '../screens/ProScreen';
import MyProScreen from '../screens/MyProScreen';
import EditProScreen from '../screens/EditProScreen';
import DetailScreen from '../screens/DetailScreen';
import MyDetailScreen from '../screens/MyDetailScreen';
import LocationScreen from '../screens/LocationScreen';
import SupProScreen from '../screens/SupProScreen';
import MySupProScreen from '../screens/MySupProScreen';
import LoginScreen from '../screens/LoginScreen';
import UsernameScreen from '../screens/UsernameScreen';
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
      tabBarIcon: ({ focused }) => (
        // focused ? <GlobeFill /> : <Globe />
        <Globe />
      )
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
      screen: ProScreen,
      navigationOptions: {
        headerTransparent: true,
        headerTintColor: '#fff'
      }
    },
    Detail: {
      screen: DetailScreen,
      navigationOptions: {
        title: 'Profile',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#323338'
        }
      }
    },
    Location: {
      screen: LocationScreen,
      navigationOptions: {
        title: 'Profile',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#323338'
        }
      }
    },
    Camp: ViewCampScreen,
    CampUpdate: ViewCampUpdateScreen,
    SupPro: SupProScreen,
    CreateReport: CreateReportScreen
  },
  {
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ focused }) => (
        // focused ? <HomeFill/> : <Home/>
        <Lightening />
      )
    }

    // transitionConfig: () => ({
    //   transitionSpec: {
    //     duration: 0
    //   }
    // })
  }
);

export const AccountSettingsStack = createStackNavigator({
  AccountSettings: AccountSettingsScreen,
  AdminScreen: AdminReportScreen,
  ReportScreen: ReportDetailScreen,
  SupProDetails: SupProScreen,
  ProDetails: ProScreen
});

const MyProStack = createStackNavigator(
  {
    Home: FeedScreen,
    MyPro: {
      screen: MyProScreen
    },
    MyDetail: { screen: MyDetailScreen },
    EditPro: {
      screen: EditProScreen,
      navigationOptions: { title: 'Edit Profile' }
    },
    Camp: ViewCampScreen,
    CreateCampaign: CreateCampScreen,
    EditCamp: EditCampScreen,
    CampUpdate: ViewCampUpdateScreen,
    CreateCampUpdate: CreateCampUpdateScreen,
    EditCampUpdate: EditCampUpdateScreen,
    CreateReport: CreateReportScreen
  },
  {
    navigationOptions: {
      tabBarLabel: 'My Profile',
      tabBarIcon: ({ focused }) => (
        // focused ? <UserFill /> : <User />
        <Smile />
      )
      // transitionSpec: {
      //   duration: 0
      // }
    }
  }
);

const MySupProStack = createStackNavigator(
  {
    MySupPro: { screen: MySupProScreen },
    EditSupPro: { screen: EditSupProScreen }
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

export const UsernameStack = createStackNavigator({
  Username: {
    screen: UsernameScreen,

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
      path: '',
      navigationOptions: {
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.navigate('Home'), defaultHandler();
        }
      }
    },
    MapStack: {
      screen: MapStack,
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        navigation.navigate('MapHome'), defaultHandler();
      }
    },
    // CreateCampStack: { screen: CreateCampStack, path: '' },
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
      path: '',
      navigationOptions: {
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.navigate('Home'), defaultHandler();
        }
      }
    },
    MapStack: {
      screen: MapStack,
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        navigation.navigate('Home'), defaultHandler();
      }
    },
    MySupProStack: {
      screen: MySupProStack,
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
