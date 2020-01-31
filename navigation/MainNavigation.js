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
import ToExpectNext from '../screens/org-onboarding-screens/ToExpectNextScreen';
import VerifyDocumentationScreen from '../screens/org-onboarding-screens/VerifyDocumentationScreen';
import VerifyOrganizationScreen from '../screens/org-onboarding-screens/VerifyOrganizationScreen';
import AlmostDone from '../screens/org-onboarding-screens/AlmostDoneScreen';
import ThankYouScreen from '../screens/org-onboarding-screens/ThankYouScreen';
import ReviewYourInfoScreen from '../screens/org-onboarding-screens/ReviewYourInfoScreen';
import OrganizationSurveyScreen from '../screens/org-onboarding-screens/OrganizationSurveyScreen';
import ToExpectNextCreateProfileScreen from '../screens/org-onboarding-screens/ToExpectNextCreateProfileScreen';

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
import SvgUri from 'react-native-svg-uri';
import SearchScreen from '../screens/SearchScreen';
import ViewCampScreen from '../screens/ViewCampScreen';
import EditCampScreen from '../screens/EditCampScreen';
import EditSupProScreen from '../screens/EditSupProScreen';
import ViewCampUpdateScreen from '../screens/ViewCampUpdateScreen';
import CreateCampUpdateScreen from '../screens/CreateCampUpdateScreen';
import EditCampUpdateScreen from '../screens/EditCampUpdateScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';
import WideMapScreen from '../screens/maps/WideMapScreen';

import LogoutScreen from '../screens/LogoutScreen';
import ToExpectNextScreen from '../screens/org-onboarding-screens/ToExpectNextScreen';

//icon imports
import Lightening from '../assets/js icons/bottom navigation/Lightening';
import Globe from '../assets/js icons/bottom navigation/Globe';
import Smile from '../assets/js icons/bottom navigation/Smile';

export const OrgOnboardStack = createStackNavigator(
	{
		HeyThere                  : HeyThereScreen,
		ToExpect                  : ToExpectScreen,
		KeyConservation           : KeyConservationScreen,
		Can                       : CanScreen,
		Cant                      : CantScreen,
		ToExpectNext              : ToExpectNextScreen,
		MakeAccount               : MakeAccountScreen,
		TellAboutOrganization     : TellAboutOrganizationScreen,
		VerifyDocumentation       : VerifyDocumentationScreen,
		VerifyOrganization        : VerifyOrganizationScreen,
		AlmostDone                : AlmostDone,
		ThankYou                  : ThankYouScreen,
		ReviewYourInfo            : ReviewYourInfoScreen,
		OrganizationSurvey        : OrganizationSurveyScreen,
		ToExpectNextCreateProfile : ToExpectNextCreateProfileScreen,
	},
	{
		headerMode : 'none',
	},
);

const MapStack = createStackNavigator(
	{
		MapHome : WideMapScreen,
	},
	{
		navigationOptions : {
			tabBarLabel : 'Map',
			tabBarIcon  : ({ focused }) => (
				// focused ? <GlobeFill /> : <Globe />
				<Globe />
			),
		},
	},
);

const FeedStack = createStackNavigator(
	{
		Home       : FeedScreen,
		Search     : {
			screen            : SearchScreen,
			navigationOptions : {
				header : null,
			},
		},
		Pro        : {
			screen            : ProScreen,
			navigationOptions : {
				title            : 'Profile',
				headerTintColor  : '#fff',
				headerTitleStyle : {
					textAlign : 'center',
					flexGrow  : 1,
					alignSelf : 'center',
				},
				headerStyle      : {
					backgroundColor : '#323338',
				},
			},
		},
		Detail     : {
			screen            : DetailScreen,
			navigationOptions : {
				title            : 'Profile',
				headerTintColor  : '#fff',
				headerTitleStyle : {
					textAlign : 'center',
					flexGrow  : 1,
					alignSelf : 'center',
				},
				headerStyle      : {
					backgroundColor : '#323338',
				},
			},
		},
		Location   : {
			screen            : LocationScreen,
			navigationOptions : {
				title            : 'Profile',
				headerTintColor  : '#fff',
				headerTitleStyle : {
					textAlign : 'center',
					flexGrow  : 1,
					alignSelf : 'center',
				},
				headerStyle      : {
					backgroundColor : '#323338',
				},
			},
		},
		Camp       : ViewCampScreen,
		CampUpdate : ViewCampUpdateScreen,
		SupPro     : SupProScreen,
	},
	{
		navigationOptions : {
			tabBarLabel : 'Feed',
			tabBarIcon  : ({ focused }) => (
				// focused ? <HomeFill/> : <Home/>
				<Lightening />
			),
		},

		transitionConfig  : () => ({
			transitionSpec : {
				duration : 0,
			},
		}),
	},
);

const CreateCampStack = createStackNavigator(
	{ CreateCampaign: CreateCampScreen },
	{
		navigationOptions : {
			headerLeft  : null,
			tabBarLabel : 'Create Campaign',
			tabBarIcon  : ({ focused }) => (
				<SvgUri
					fill='#3b3b3b'
					width='25'
					height='25'
					source={focused ? require('../assets/icons/plus-fill.svg') : require('../assets/icons/plus.svg')}
				/>
			),
		},
	},
);

export const AccountSettingsStack = createStackNavigator({
	AccountSettings : AccountSettingsScreen,
});

const MyProStack = createStackNavigator(
	{
		MyPro            : { screen: MyProScreen },
		MyDetail         : { screen: MyDetailScreen },
		EditPro          : {
			screen            : EditProScreen,
			navigationOptions : { title: 'Edit Profile' },
		},
		Camp             : ViewCampScreen,
		EditCamp         : EditCampScreen,
		CampUpdate       : ViewCampUpdateScreen,
		CreateCampUpdate : CreateCampUpdateScreen,
		EditCampUpdate   : EditCampUpdateScreen,
	},
	{
		transitionConfig  : () => ({
			transitionSpec : {
				duration : 0,
			},
		}),
		navigationOptions : {
			tabBarLabel : 'My Profile',
			tabBarIcon  : ({ focused }) => (
				// focused ? <UserFill /> : <User />
				<Smile />
			),
		},
	},
);

const MySupProStack = createStackNavigator(
	{
		MySupPro   : { screen: MySupProScreen },
		EditSupPro : { screen: EditSupProScreen },
	},
	{
		transitionConfig  : () => ({
			transitionSpec : {
				duration : 0,
			},
		}),
		navigationOptions : {
			tabBarLabel : 'My Profile',
			tabBarIcon  : ({ focused }) => <Smile />,
		},
	},
);

export const UsernameStack = createStackNavigator({
	Username : {
		screen            : UsernameScreen,

		navigationOptions : {
			title            : 'Sign Up',
			headerTitleStyle : {
				flex      : 1,
				textAlign : 'center',
				color     : 'white',
			},
			headerStyle      : {
				backgroundColor : '#323338',
			},
		},
	},
});

export const LoginStack = createStackNavigator(
	{ Login: LoginScreen },
	{
		headerMode : 'none',
	},
);

export const LogoutStack = createStackNavigator(
	{ Logout: LogoutScreen },
	{
		headerMode : 'none',
	},
);

export const ConsNavigator = createBottomTabNavigator(
	{
		FeedStack       : {
			screen            : FeedStack,
			path              : '',
			navigationOptions : {
				tabBarOnPress : ({ navigation, defaultHandler }) => {
					navigation.navigate('Home'), defaultHandler();
				},
			},
		},
		MapStack        : {
			screen        : MapStack,
			tabBarOnPress : ({ navigation, defaultHandler }) => {
				navigation.navigate('MapHome'), defaultHandler();
			},
		},
		CreateCampStack : { screen: CreateCampStack, path: '' },
		MyProStack      : {
			screen            : MyProStack,
			path              : '',
			navigationOptions : {
				tabBarOnPress : ({ navigation, defaultHandler }) => {
					navigation.navigate('MyPro'), defaultHandler();
				},
			},
		},
	},
	{
		tabBarOptions : {
			showIcon  : true,
			showLabel : false,
		},
	},
);

export const SupNavigator = createBottomTabNavigator(
	{
		FeedStack     : {
			screen            : FeedStack,
			path              : '',
			navigationOptions : {
				tabBarOnPress : ({ navigation, defaultHandler }) => {
					navigation.navigate('Home'), defaultHandler();
				},
			},
		},
		MapStack      : {
			screen        : MapStack,
			tabBarOnPress : ({ navigation, defaultHandler }) => {
				navigation.navigate('Home'), defaultHandler();
			},
		},
		MySupProStack : {
			screen            : MySupProStack,
			path              : '',
			navigationOptions : {
				tabBarOnPress : ({ navigation, defaultHandler }) => {
					navigation.navigate('MySupPro'), defaultHandler();
				},
			},
		},
	},
	{
		tabBarOptions : {
			showIcon  : true,
			showLabel : false,
		},
	},
);
