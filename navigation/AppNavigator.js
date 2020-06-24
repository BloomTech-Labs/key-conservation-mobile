import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import {
  ConsNavigator,
  SupporterNavigator,
  LoginStack,
  NameStack,
  LogoutStack,
  OrgOnboardStack,
  AccountSettingsStack,
} from './MainNavigation';
import LoadingScreenMov from '../components/LoadingScreenMov';
import LoadingScreen from '../screens/LoadingScreen';
import VettingCheck from '../screens/VettingCheck';

// This is the top level navigator for the app. It covers the loading process, and sorts the user into the version of the app they will be seeing.
export default createAppContainer(
  createSwitchNavigator(
    {
      // First three routes deal with login / onboarding of users
      Mov: LoadingScreenMov,
      Loading: LoadingScreen,
      OrgOnboard: OrgOnboardStack,
      Login: LoginStack,
      Vetting: VettingCheck,
      CreateAccount: NameStack,
      Conservationist: ConsNavigator,
      Supporter: SupporterNavigator,
      Logout: LogoutStack,
      AccountSettings: AccountSettingsStack,
    },
    {
      defaultNavigationOptions: {
        headerTitleStyle: {
          textAlign: 'center',
          flexGrow: 1,
          // marginTop: 10,
          alignSelf: 'center',
          fontFamily: 'Lato-Bold',
        },
      },
    }
  )
);
