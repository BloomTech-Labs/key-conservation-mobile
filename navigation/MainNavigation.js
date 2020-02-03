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

import { SvgXml } from "react-native-svg";

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

const globe = `<svg width="25" height="31" viewBox="0 0 25 31" fill="none" xmlns="https://www.w3.org/2000/svg">
<path d="M7.00727 0.0108673C6.81452 0.0426559 6.63237 0.120181 6.47636 0.236837C2.58545 2.76938 0 7.1169 0 12.069C0 19.4864 5.77818 25.5827 13.1054 26.1921V27.6189C10.6654 27.8965 8.9006 28.8966 8.9006 28.8966C8.68852 29.0236 8.52381 29.2155 8.43127 29.4434C8.33872 29.6713 8.32336 29.9229 8.3875 30.1602C8.45164 30.3975 8.5918 30.6077 8.78687 30.7592C8.98195 30.9107 9.22137 30.9952 9.46908 31H19.166C19.4138 30.9952 19.6532 30.9107 19.8483 30.7592C20.0433 30.6077 20.1835 30.3975 20.2476 30.1602C20.3118 29.9229 20.2964 29.6713 20.2039 29.4434C20.1113 29.2155 19.9466 29.0236 19.7345 28.8966C19.7345 28.8966 17.9697 27.8965 15.5297 27.6189V26.2294C17.8973 26.0243 20.1759 25.2365 22.1588 23.9372C22.3127 23.8616 22.4486 23.7543 22.5576 23.6226C22.6666 23.4909 22.746 23.3377 22.7908 23.1733C22.8355 23.0088 22.8445 22.8367 22.8171 22.6686C22.7897 22.5004 22.7265 22.3399 22.6318 22.1978C22.5371 22.0556 22.413 21.9351 22.2678 21.8441C22.1225 21.7531 21.9595 21.6938 21.7893 21.6701C21.6192 21.6463 21.4459 21.6587 21.281 21.7064C21.1161 21.7541 20.9633 21.8361 20.8327 21.9468C18.963 23.1655 16.7815 23.8301 14.5442 23.8627C14.3945 23.8344 14.2407 23.8344 14.0909 23.8627C10.9753 23.8051 8.00709 22.5368 5.82495 20.3309C3.64282 18.1251 2.42122 15.1578 2.42303 12.0678C2.42424 7.94025 4.57212 4.33074 7.80242 2.2273C8.03971 2.08335 8.21985 1.86286 8.31261 1.60281C8.40538 1.34276 8.40512 1.05899 8.31189 0.799105C8.21865 0.539223 8.03811 0.319047 7.80057 0.175524C7.56302 0.032 7.28292 -0.0261373 7.00727 0.0108673ZM14.3176 1.2513C12.3697 1.2513 10.5527 1.76814 8.97696 2.67803C8.8206 2.74775 8.6703 2.84631 8.52242 2.94126C8.3319 3.06107 8.15404 3.1996 7.99151 3.35474C5.36727 5.28751 3.63515 8.36575 3.63515 11.843C3.63515 13.902 4.23151 15.8095 5.26424 17.4394C5.30375 17.5214 5.35476 17.5975 5.41575 17.6654C7.33333 20.5224 10.6121 22.436 14.3176 22.436C16.3742 22.444 18.3883 21.8562 20.1127 20.7448C20.1685 20.71 20.2121 20.6703 20.2642 20.633C23.1066 18.7243 25 15.4874 25 11.843C25.0037 9.90749 24.4658 8.00886 23.446 6.35846C23.3952 6.20077 23.3042 6.05876 23.1818 5.94618C23.1709 5.93176 23.1527 5.92214 23.143 5.90772C23.1197 5.88157 23.0951 5.85669 23.0691 5.8332C21.1333 3.0855 17.937 1.2513 14.3176 1.2513ZM14.3176 3.2045C15.1127 3.2045 15.897 3.30907 16.6279 3.50499L15.3018 4.368C14.8654 4.03145 14.417 3.72615 13.977 3.46652C13.8351 3.38359 13.703 3.31628 13.56 3.24176C13.8061 3.22132 14.0654 3.2045 14.3176 3.2045ZM10.5673 4.29348C11.2182 4.28146 12.0436 4.52426 12.9915 5.08197C13.1721 5.18774 13.377 5.33078 13.56 5.45819L8.78666 8.49916C8.74666 8.28281 8.69575 8.06646 8.67393 7.86212C8.48363 6.12167 8.93575 4.99302 9.6206 4.55671C9.6303 4.5507 9.64969 4.56152 9.65818 4.55671C9.9103 4.40406 10.1927 4.29949 10.5673 4.29228V4.29348ZM18.7491 4.44372C18.762 4.44398 18.7749 4.44398 18.7879 4.44372C19.6703 4.96538 20.4545 5.60843 21.0982 6.39692L18.6739 7.93664C18.0812 7.1145 17.4751 6.34163 16.817 5.68295L18.7491 4.44372ZM15.1127 6.77194C15.8062 7.45636 16.44 8.19782 17.0073 8.98836L10.6048 13.0823C10.1146 12.2425 9.69697 11.3632 9.35636 10.4536L15.1127 6.77194ZM6.74181 7.56163C6.75151 7.7239 6.76121 7.88496 6.77939 8.04963C6.83393 8.54604 6.95878 9.06409 7.08242 9.58935L5.71878 10.4536C5.88133 9.43635 6.22791 8.45663 6.74181 7.56163ZM22.1212 8.01237C22.5576 8.89221 22.8788 9.84417 22.9915 10.867C22.9651 10.8905 22.94 10.9154 22.9163 10.9416L20.9842 12.1808C20.657 11.3166 20.2388 10.4259 19.7345 9.55209L22.1212 8.01237ZM18.0679 10.6038C18.583 11.4969 19.0048 12.3767 19.3176 13.2325L13.5224 16.9141C12.8289 16.2297 12.1951 15.4883 11.6279 14.6977L18.0679 10.6038ZM7.6509 11.5053C7.98302 12.3743 8.42908 13.2566 8.93939 14.134L6.51515 15.6737C6.0539 14.7686 5.75841 13.7894 5.64242 12.7818L7.6509 11.5065V11.5053ZM22.9163 13.2325C22.7538 14.2497 22.4072 15.2295 21.8933 16.1244C21.8836 15.9502 21.8751 15.7759 21.8557 15.5992C21.8024 15.116 21.7103 14.6064 21.5903 14.0967L22.9163 13.2325ZM19.8473 15.1857C19.886 15.3961 19.9394 15.6256 19.9612 15.824C20.1515 17.5644 19.6994 18.6558 19.0145 19.0933C18.3297 19.5296 17.16 19.4972 15.6436 18.6041C15.463 18.4983 15.2582 18.3553 15.0751 18.2279L19.8485 15.1869L19.8473 15.1857ZM9.96121 15.7494C10.5307 16.5498 11.1643 17.3035 11.8557 18.0031L9.84848 19.2808C8.96805 18.7697 8.18553 18.1085 7.53696 17.3276L9.96121 15.7494ZM13.3709 19.3181C13.7939 19.6414 14.2315 19.9311 14.6582 20.1811C14.8254 20.2797 14.9818 20.3578 15.1503 20.4455C14.8812 20.4696 14.5939 20.4816 14.3176 20.4816C13.5375 20.4822 12.7608 20.3811 12.0073 20.1811L13.3709 19.3181Z" fill="#3b3b3b"/>
</svg>
`;

const Globe = () => <SvgXml xml={globe} width="25" height="25" />;

const globefill = `<svg width="25" height="31" viewBox="0 0 25 31" fill="#3b3b3b" xmlns="http://www.w3.org/2000/svg">
<path d="M7.00727 0.0108673C6.81452 0.0426559 6.63237 0.120181 6.47636 0.236837C2.58545 2.76938 0 7.1169 0 12.069C0 19.4864 5.77818 25.5827 13.1054 26.1921V27.6189C10.6654 27.8965 8.9006 28.8966 8.9006 28.8966C8.68852 29.0236 8.52381 29.2155 8.43127 29.4434C8.33872 29.6713 8.32336 29.9229 8.3875 30.1602C8.45164 30.3975 8.5918 30.6077 8.78687 30.7592C8.98195 30.9107 9.22137 30.9952 9.46908 31H19.166C19.4138 30.9952 19.6532 30.9107 19.8483 30.7592C20.0433 30.6077 20.1835 30.3975 20.2476 30.1602C20.3118 29.9229 20.2964 29.6713 20.2039 29.4434C20.1113 29.2155 19.9466 29.0236 19.7345 28.8966C19.7345 28.8966 17.9697 27.8965 15.5297 27.6189V26.2294C17.8973 26.0243 20.1759 25.2365 22.1588 23.9372C22.3127 23.8616 22.4486 23.7543 22.5576 23.6226C22.6666 23.4909 22.746 23.3377 22.7908 23.1733C22.8355 23.0088 22.8445 22.8367 22.8171 22.6686C22.7897 22.5004 22.7265 22.3399 22.6318 22.1978C22.5371 22.0556 22.413 21.9351 22.2678 21.8441C22.1225 21.7531 21.9595 21.6938 21.7893 21.6701C21.6192 21.6463 21.4459 21.6587 21.281 21.7064C21.1161 21.7541 20.9633 21.8361 20.8327 21.9468C18.963 23.1655 16.7815 23.8301 14.5442 23.8627C14.3945 23.8344 14.2407 23.8344 14.0909 23.8627C10.9753 23.8051 8.00709 22.5368 5.82495 20.3309C3.64282 18.1251 2.42122 15.1578 2.42303 12.0678C2.42424 7.94025 4.57212 4.33074 7.80242 2.2273C8.03971 2.08335 8.21985 1.86286 8.31261 1.60281C8.40538 1.34276 8.40512 1.05899 8.31189 0.799105C8.21865 0.539223 8.03811 0.319047 7.80057 0.175524C7.56302 0.032 7.28292 -0.0261373 7.00727 0.0108673ZM14.3176 1.2513C12.3697 1.2513 10.5527 1.76814 8.97696 2.67803C8.8206 2.74775 8.6703 2.84631 8.52242 2.94126C8.3319 3.06107 8.15404 3.1996 7.99151 3.35474C5.36727 5.28751 3.63515 8.36575 3.63515 11.843C3.63515 13.902 4.23151 15.8095 5.26424 17.4394C5.30375 17.5214 5.35476 17.5975 5.41575 17.6654C7.33333 20.5224 10.6121 22.436 14.3176 22.436C16.3742 22.444 18.3883 21.8562 20.1127 20.7448C20.1685 20.71 20.2121 20.6703 20.2642 20.633C23.1066 18.7243 25 15.4874 25 11.843C25.0037 9.90749 24.4658 8.00886 23.446 6.35846C23.3952 6.20077 23.3042 6.05876 23.1818 5.94618C23.1709 5.93176 23.1527 5.92214 23.143 5.90772C23.1197 5.88157 23.0951 5.85669 23.0691 5.8332C21.1333 3.0855 17.937 1.2513 14.3176 1.2513ZM14.3176 3.2045C15.1127 3.2045 15.897 3.30907 16.6279 3.50499L15.3018 4.368C14.8654 4.03145 14.417 3.72615 13.977 3.46652C13.8351 3.38359 13.703 3.31628 13.56 3.24176C13.8061 3.22132 14.0654 3.2045 14.3176 3.2045ZM10.5673 4.29348C11.2182 4.28146 12.0436 4.52426 12.9915 5.08197C13.1721 5.18774 13.377 5.33078 13.56 5.45819L8.78666 8.49916C8.74666 8.28281 8.69575 8.06646 8.67393 7.86212C8.48363 6.12167 8.93575 4.99302 9.6206 4.55671C9.6303 4.5507 9.64969 4.56152 9.65818 4.55671C9.9103 4.40406 10.1927 4.29949 10.5673 4.29228V4.29348ZM18.7491 4.44372C18.762 4.44398 18.7749 4.44398 18.7879 4.44372C19.6703 4.96538 20.4545 5.60843 21.0982 6.39692L18.6739 7.93664C18.0812 7.1145 17.4751 6.34163 16.817 5.68295L18.7491 4.44372ZM15.1127 6.77194C15.8062 7.45636 16.44 8.19782 17.0073 8.98836L10.6048 13.0823C10.1146 12.2425 9.69697 11.3632 9.35636 10.4536L15.1127 6.77194ZM6.74181 7.56163C6.75151 7.7239 6.76121 7.88496 6.77939 8.04963C6.83393 8.54604 6.95878 9.06409 7.08242 9.58935L5.71878 10.4536C5.88133 9.43635 6.22791 8.45663 6.74181 7.56163ZM22.1212 8.01237C22.5576 8.89221 22.8788 9.84417 22.9915 10.867C22.9651 10.8905 22.94 10.9154 22.9163 10.9416L20.9842 12.1808C20.657 11.3166 20.2388 10.4259 19.7345 9.55209L22.1212 8.01237ZM18.0679 10.6038C18.583 11.4969 19.0048 12.3767 19.3176 13.2325L13.5224 16.9141C12.8289 16.2297 12.1951 15.4883 11.6279 14.6977L18.0679 10.6038ZM7.6509 11.5053C7.98302 12.3743 8.42908 13.2566 8.93939 14.134L6.51515 15.6737C6.0539 14.7686 5.75841 13.7894 5.64242 12.7818L7.6509 11.5065V11.5053ZM22.9163 13.2325C22.7538 14.2497 22.4072 15.2295 21.8933 16.1244C21.8836 15.9502 21.8751 15.7759 21.8557 15.5992C21.8024 15.116 21.7103 14.6064 21.5903 14.0967L22.9163 13.2325ZM19.8473 15.1857C19.886 15.3961 19.9394 15.6256 19.9612 15.824C20.1515 17.5644 19.6994 18.6558 19.0145 19.0933C18.3297 19.5296 17.16 19.4972 15.6436 18.6041C15.463 18.4983 15.2582 18.3553 15.0751 18.2279L19.8485 15.1869L19.8473 15.1857ZM9.96121 15.7494C10.5307 16.5498 11.1643 17.3035 11.8557 18.0031L9.84848 19.2808C8.96805 18.7697 8.18553 18.1085 7.53696 17.3276L9.96121 15.7494ZM13.3709 19.3181C13.7939 19.6414 14.2315 19.9311 14.6582 20.1811C14.8254 20.2797 14.9818 20.3578 15.1503 20.4455C14.8812 20.4696 14.5939 20.4816 14.3176 20.4816C13.5375 20.4822 12.7608 20.3811 12.0073 20.1811L13.3709 19.3181Z" fill="#9A99A2"/>
<circle cx="14.5" cy="11.5" r="9.5" fill="#3b3b3b"/>
</svg>`;

const GlobeFill = () => <SvgXml xml={globefill} width="25" height="25" />;

const home = `<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="home" class="svg-inline--fa fa-home fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#3b3b3b" d="M570.24 247.41L512 199.52V104a8 8 0 0 0-8-8h-32a8 8 0 0 0-7.95 7.88v56.22L323.87 45a56.06 56.06 0 0 0-71.74 0L5.76 247.41a16 16 0 0 0-2 22.54L14 282.25a16 16 0 0 0 22.53 2L64 261.69V448a32.09 32.09 0 0 0 32 32h128a32.09 32.09 0 0 0 32-32V344h64v104a32.09 32.09 0 0 0 32 32h128a32.07 32.07 0 0 0 32-31.76V261.67l27.53 22.62a16 16 0 0 0 22.53-2L572.29 270a16 16 0 0 0-2.05-22.59zM463.85 432H368V328a32.09 32.09 0 0 0-32-32h-96a32.09 32.09 0 0 0-32 32v104h-96V222.27L288 77.65l176 144.56z"></path></svg>
`;

const Home = () => <SvgXml xml={home} width="25" height="25" />;

const homefill = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="home-lg" class="svg-inline--fa fa-home-lg fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#3b3b3b" d="M570.69 236.28L512 184.45V48a16 16 0 0 0-16-16h-64a16 16 0 0 0-16 16v51.69L314.75 10.31a39.85 39.85 0 0 0-53.45 0l-256 226a16 16 0 0 0-1.21 22.6L25.5 282.7a16 16 0 0 0 22.6 1.21L277.42 81.63a16 16 0 0 1 21.17 0L527.91 283.9a16 16 0 0 0 22.6-1.21l21.4-23.82a16 16 0 0 0-1.22-22.59zM288 115L69.47 307.71c-1.62 1.46-3.69 2.14-5.47 3.35V496a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V368a16 16 0 0 1 16-16h96a16 16 0 0 1 16 16v128a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V311.1c-1.7-1.16-3.72-1.82-5.26-3.2z"></path></svg>`;

const HomeFill = () => <SvgXml xml={homefill} width="25" height="25" />;

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
      tabBarIcon: ({ focused }) => (focused ? <GlobeFill /> : <Globe />)
      // <SvgUri
      //   fill="#3b3b3b"
      //   width="25"
      //   height="25"
      //   source={
      //     focused
      //       ? require("../assets/icons/globe-fill.svg")
      //       : require("../assets/icons/globe.svg")
      //     // require("../assets/icons/globe.svg")
      //   }
      // />
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
      tabBarIcon: ({ focused }) => (focused ? <HomeFill /> : <Home />),
      transitionSpec: {
        duration: 0
      }
    }
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
    navigationOptions: {
      tabBarLabel: "My Profile",
      tabBarIcon: ({ focused }) => (focused ? <UserFill /> : <User />),
      transitionSpec: {
        duration: 0
      }
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
      ),
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
