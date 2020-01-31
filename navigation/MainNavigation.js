import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { createStackNavigator } from "react-navigation-stack";

import CanScreen from "../screens/org-onboarding-screens/CanScreen";
import CantScreen from "../screens/org-onboarding-screens/CantScreen";
import HeyThereScreen from "../screens/org-onboarding-screens/HeyThereScreen";
import KeyConservationScreen from "../screens/org-onboarding-screens/KeyConservationScreen";
import MakeAccountScreen from "../screens/org-onboarding-screens/MakeAccountScreen";
import TellAboutOrganizationScreen from "../screens/org-onboarding-screens/TellAboutOrganizationScreen";
import ToExpectScreen from "../screens/org-onboarding-screens/ToExpectScreen";
import ToExpectNext from "../screens/org-onboarding-screens/ToExpectNextScreen";
import VerifyDocumentationScreen from "../screens/org-onboarding-screens/VerifyDocumentationScreen";
import VerifyOrganizationScreen from "../screens/org-onboarding-screens/VerifyOrganizationScreen";
import AlmostDone from "../screens/org-onboarding-screens/AlmostDoneScreen";
import ThankYouScreen from "../screens/org-onboarding-screens/ThankYouScreen";
import ReviewYourInfoScreen from "../screens/org-onboarding-screens/ReviewYourInfoScreen";
import OrganizationSurveyScreen from "../screens/org-onboarding-screens/OrganizationSurveyScreen";
import ToExpectNextCreateProfileScreen from "../screens/org-onboarding-screens/ToExpectNextCreateProfileScreen";

import FeedScreen from "../screens/FeedScreen";
import CreateCampScreen from "../screens/CreateCampScreen";
import ProScreen from "../screens/ProScreen";
import MyProScreen from "../screens/MyProScreen";
import EditProScreen from "../screens/EditProScreen";
import DetailScreen from "../screens/DetailScreen";
import MyDetailScreen from "../screens/MyDetailScreen";
import LocationScreen from "../screens/LocationScreen";
import SupProScreen from "../screens/SupProScreen";
import MySupProScreen from "../screens/MySupProScreen";
import LoginScreen from "../screens/LoginScreen";
import UsernameScreen from "../screens/UsernameScreen";
import SvgUri from "react-native-svg-uri";
import SearchScreen from "../screens/SearchScreen";
import ViewCampScreen from "../screens/ViewCampScreen";
import EditCampScreen from "../screens/EditCampScreen";
import EditSupProScreen from "../screens/EditSupProScreen";
import ViewCampUpdateScreen from "../screens/ViewCampUpdateScreen";
import CreateCampUpdateScreen from "../screens/CreateCampUpdateScreen";
import EditCampUpdateScreen from "../screens/EditCampUpdateScreen";
import AccountSettingsScreen from "../screens/AccountSettingsScreen";
import WideMapScreen from "../screens/maps/WideMapScreen";

import LogoutScreen from "../screens/LogoutScreen";
import ToExpectNextScreen from "../screens/org-onboarding-screens/ToExpectNextScreen";

//icon imports
import { SvgXml } from "react-native-svg";
import Lightening from "../assets/js icons/bottom navigation/Lightening";
import Globe from "../assets/js icons/bottom navigation/Globe";

export const OrgOnboardStack = createStackNavigator(
  {
    HeyThere: HeyThereScreen,
    ToExpect: ToExpectScreen,
    KeyConservation: KeyConservationScreen,
    Can: CanScreen,
    Cant: CantScreen,
    ToExpectNext: ToExpectNextScreen,
    MakeAccount: MakeAccountScreen,
    TellAboutOrganization: TellAboutOrganizationScreen,
    VerifyDocumentation: VerifyDocumentationScreen,
    VerifyOrganization: VerifyOrganizationScreen,
    AlmostDone: AlmostDone,
    ThankYou: ThankYouScreen,
    ReviewYourInfo: ReviewYourInfoScreen,
    OrganizationSurvey: OrganizationSurveyScreen,
    ToExpectNextCreateProfile: ToExpectNextCreateProfileScreen
  },
  {
    headerMode: "none"
  }
);

const user = `<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="user" class="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#3b3b3b" d="M313.6 288c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4zM416 464c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16v-41.6C32 365.9 77.9 320 134.4 320c19.6 0 39.1 16 89.6 16 50.4 0 70-16 89.6-16 56.5 0 102.4 45.9 102.4 102.4V464zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm0-224c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"></path></svg>
`;

const User = () => <SvgXml xml={user} width="25" height="25" />;

const userfill = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" class="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#3b3b3b" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>`;

const UserFill = () => <SvgXml xml={userfill} width="25" height="25" />;

const MapStack = createStackNavigator(
  {
    MapHome: WideMapScreen
  },
  {
    navigationOptions: {
      tabBarLabel: "Map",
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
        title: "Profile",
        headerTintColor: "#fff",
        headerTitleStyle: {
          textAlign: "center",
          flexGrow: 1,
          alignSelf: "center"
        },
        headerStyle: {
          backgroundColor: "#323338"
        }
      }
    },
    Detail: {
      screen: DetailScreen,
      navigationOptions: {
        title: "Profile",
        headerTintColor: "#fff",
        headerTitleStyle: {
          textAlign: "center",
          flexGrow: 1,
          alignSelf: "center"
        },
        headerStyle: {
          backgroundColor: "#323338"
        }
      }
    },
    Location: {
      screen: LocationScreen,
      navigationOptions: {
        title: "Profile",
        headerTintColor: "#fff",
        headerTitleStyle: {
          textAlign: "center",
          flexGrow: 1,
          alignSelf: "center"
        },
        headerStyle: {
          backgroundColor: "#323338"
        }
      }
    },
    Camp: ViewCampScreen,
    CampUpdate: ViewCampUpdateScreen,
    SupPro: SupProScreen
  },

  {
    navigationOptions: {
      tabBarLabel: "Feed",
      tabBarIcon: ({ focused }) => (
        // focused ? <HomeFill/> : <Home/>
        <Lightening />
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
      tabBarLabel: "Create Campaign",
      tabBarIcon: ({ focused }) => (
        <SvgUri
          fill="#3b3b3b"
          width="25"
          height="25"
          source={
            focused
              ? require("../assets/icons/plus-fill.svg")
              : require("../assets/icons/plus.svg")
          }
        />
      )
    }
  }
);

export const AccountSettingsStack = createStackNavigator({
  AccountSettings: AccountSettingsScreen
});

const MyProStack = createStackNavigator(
  {
    MyPro: { screen: MyProScreen },
    MyDetail: { screen: MyDetailScreen },
    EditPro: {
      screen: EditProScreen,
      navigationOptions: { title: "Edit Profile" }
    },
    Camp: ViewCampScreen,
    EditCamp: EditCampScreen,
    CampUpdate: ViewCampUpdateScreen,
    CreateCampUpdate: CreateCampUpdateScreen,
    EditCampUpdate: EditCampUpdateScreen
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0
      }
    }),
    navigationOptions: {
      tabBarLabel: "My Profile",
      tabBarIcon: ({ focused }) => (focused ? <UserFill /> : <User />)
      // <SvgUri
      //   fill="#3b3b3b"
      //   width="25"
      //   height="25"
      //   source={
      //     focused
      //       ? require("../assets/icons/user-fill.svg")
      //       : require("../assets/icons/user.svg")
      //   }
      // />
    }
  }
);

const MySupProStack = createStackNavigator(
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
      tabBarLabel: "My Profile",
      tabBarIcon: ({ focused }) => (
        <SvgUri
          fill="#3b3b3b"
          width="25"
          height="25"
          source={
            focused
              ? require("../assets/icons/user-fill.svg")
              : require("../assets/icons/user.svg")
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

export const LogoutStack = createStackNavigator(
  { Logout: LogoutScreen },
  {
    headerMode: "none"
  }
);

export const ConsNavigator = createBottomTabNavigator(
  {
    FeedStack: {
      screen: FeedStack,
      path: "",
      navigationOptions: {
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.navigate("Home"), defaultHandler();
        }
      }
    },
    MapStack: {
      screen: MapStack,
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        navigation.navigate("MapHome"), defaultHandler();
      }
    },
    CreateCampStack: { screen: CreateCampStack, path: "" },
    MyProStack: {
      screen: MyProStack,
      path: "",
      navigationOptions: {
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.navigate("MyPro"), defaultHandler();
        }
      }
    }
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: false
    }
  }
);

export const SupNavigator = createBottomTabNavigator(
  {
    FeedStack: {
      screen: FeedStack,
      path: "",
      navigationOptions: {
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.navigate("Home"), defaultHandler();
        }
      }
    },
    MapStack: {
      screen: MapStack,
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        navigation.navigate("Home"), defaultHandler();
      }
    },
    MySupProStack: {
      screen: MySupProStack,
      path: "",
      navigationOptions: {
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          navigation.navigate("MySupPro"), defaultHandler();
        }
      }
    }
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: false
    }
  }
);
