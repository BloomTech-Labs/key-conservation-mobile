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
import CreateCampaignScreen from '../screens/CreateCampaignScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import NameScreen from '../screens/NameScreen';
import SearchScreen from '../screens/SearchScreen';
import ViewCampaignScreen from '../screens/ViewCampaignScreen';
import EditCampaignScreen from '../screens/EditCampaignScreen';
import EditSupporterProfileScreen from '../screens/EditSupporterProfileScreen';
import CreateCampaignUpdateScreen from '../screens/CreateCampaignUpdateScreen';
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
import OrgSkillImpactScreen from '../screens/org-skillimpact-screen/OrgSkillImpactScreen';
import SupporterSkillImpactScreen from '../screens/supporter-skillimpact-screen/SupporterSkillImpactScreen';

//icon imports

import Lightening from '../assets/jsicons/bottomnavigation/Lightening';
import Globe from '../assets/jsicons/bottomnavigation/Globe';
import Smile from '../assets/jsicons/bottomnavigation/Smile';
import Sync from '../assets/jsicons/bottomnavigation/Sync';

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
    Welcome: WelcomeScreen,
  },
  {
    headerMode: 'none',
  }
);

const MapStack = createStackNavigator(
  {
    MapHome: WideMapScreen,
  },
  {
    navigationOptions: {
      tabBarLabel: 'Map',
      tabBarIcon: ({ focused }) => <Globe />,
    },
  }
);

const FeedStack = createStackNavigator(
  {
    Home: FeedScreen,
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Pro: {
      screen: ProfileScreen,
      navigationOptions: {
        headerTransparent: true,
        headerTintColor: '#fff',
      },
    },
    Connections: { screen: ConnectionsScreen },
    SelectedConnections: { screen: SelectedConnectionsScreen },
    Campaign: ViewCampaignScreen,
    SupporterProfile: ProfileScreen,
    CreateReport: CreateReportScreen,
    EditCampaign: EditCampaignScreen,
    CreateCampaign: CreateCampaignScreen,
    CreateCampaignUpdate: CreateCampaignUpdateScreen,
  },
  {
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ focused }) => <Lightening />,
    },
  }
);

const SkillImpactStack = createStackNavigator(
  //TODO add the rest of skill request screens for conservationists here
  {
    SkillImpact: OrgSkillImpactScreen,
  },
  {
    navigationOptions: {
      tabBarLabel: 'Skilled Impact',
      tabBarIcon: ({ focused }) => <Sync />,
    },
  }
);

const SupporterSkillImpactStack = createStackNavigator(
  //TODO add the rest of skill request screens for supporters here
  {
    SkillImpact: SupporterSkillImpactScreen,
  },
  {
    navigationOptions: {
      tabBarLabel: 'Skilled Impact',
      tabBarIcon: ({ focused }) => <Sync />,
    },
  }
);

export const AccountSettingsStack = createStackNavigator({
  AccountSettings: AccountSettingsScreen,
  AdminScreen: AdminReportScreen,
  ReportScreen: ReportDetailScreen,
  ProfileDetails: ProfileScreen,
  Connections: ConnectionsScreen,
  SelectedConnections: SelectedConnectionsScreen,
});

const MyProStack = createStackNavigator(
  {
    Pro: {
      screen: ProfileScreen,
    },
    MyPro: {
      screen: ProfileScreen,
    },
    EditProfile: {
      screen: EditProfileScreen,
      navigationOptions: { title: 'Edit Profile' },
    },
    Campaign: ViewCampaignScreen,
    EditCampaign: EditCampaignScreen,
    CreateCampaignUpdate: CreateCampaignUpdateScreen,
    CreateReport: CreateReportScreen,
  },
  {
    navigationOptions: {
      tabBarLabel: 'My Profile',
      tabBarIcon: ({ focused }) => <Smile />,
    },
  }
);

const SupporterProfileStack = createStackNavigator(
  {
    MySupporterProfile: { screen: ProfileScreen },
    EditSupporterProfile: { screen: EditSupporterProfileScreen },
    Connections: { screen: ConnectionsScreen },
  },
  {
    navigationOptions: {
      tabBarLabel: 'My Profile',
      tabBarIcon: ({ focused }) => <Smile />,
      transitionSpec: {
        duration: 0,
      },
    },
  }
);

export const NameStack = createStackNavigator({
  Name: {
    screen: NameScreen,

    navigationOptions: {
      title: 'Sign Up',
      headerStyle: {
        borderWidth: 2,
        backgroundColor: '#323338',
      },
    },
  },
});

export const LoginStack = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    ResetPassword: { screen: ResetPasswordScreen },
  },
  {
    headerMode: 'none',
  }
);

export const LogoutStack = createStackNavigator(
  { Logout: LogoutScreen },
  {
    headerMode: 'none',
  }
);

export const ConsNavigator = createBottomTabNavigator(
  {
    FeedStack: {
      screen: FeedStack,
      path: '',
    },
    SkillImpactStack: {
      screen: SkillImpactStack,
      path: '',
    },
    MapStack: {
      screen: MapStack,
    },
    MyProStack: {
      screen: MyProStack,
      path: '',
    },
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeBackgroundColor: '#EAEAEA',
      style: {
        borderTopColor: 'transparent',
      },
      tabStyle: {
        borderRightColor: '#EAEAEA',
        borderRightWidth: 1,
        borderRightHeight: 10,
        borderLeftColor: '#EAEAEA',
        borderLeftWidth: 1,
        borderLeftHeight: 10,
      },
    },
  }
);

export const SupporterNavigator = createBottomTabNavigator(
  {
    FeedStack: {
      screen: FeedStack,
      path: '',
    },
    SupporterSkillImpactStack: {
      screen: SupporterSkillImpactStack,
      path: '',
    },
    MapStack: {
      screen: MapStack,
    },
    SupporterProfileStack: {
      screen: SupporterProfileStack,
      path: '',
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      activeBackgroundColor: '#EAEAEA',
      style: {
        borderTopColor: 'transparent',
      },
      tabStyle: {
        borderRightColor: '#EAEAEA',
        borderRightWidth: 1,
        borderRightHeight: 10,
        borderLeftColor: '#EAEAEA',
        borderLeftWidth: 1,
        borderLeftHeight: 10,
      },
    },
  }
);
