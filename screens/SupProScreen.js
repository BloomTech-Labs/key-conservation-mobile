import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getProfileData } from '../store/actions';
import SupProfileBody from '../components/Profile/SupProfileBody';
import BackButton from '../components/BackButton';
import Ellipse from '../assets/jsicons/Ellipse';

import UserActionSheet from '../components/Reports/UserActionSheet';
import EditButton from '../components/EditButton';
import SettingsButton from '../components/SettingsButton';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';
import ProfileHeader from '../components/Profile/ProfileHeader';

const SupProScreen = props => {
  const actionSheetRef = useRef(null);

  const showActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const onMount = () => {
    const id =
      props.navigation.getParam('selectedProfile') ||
      props.currentUserProfile.id;
    props.getProfileData(
      id,
      null,
      !props.navigation.getParam('selectedProfile')
    );
    props.navigation.setParams({
      showSupProScreenActions: showActionSheet,
      currentProfile: props.currentUserProfile
    });

    return () => {
      // Clear selectedProfile if any
      props.navigation.setParams({ selectedProfile: null });
    };
  };

  useEffect(onMount, []);

  const profileData = props.navigation.getParam('selectedProfile')
    ? props.selectedProfile
    : props.currentUserProfile;

  return (
    <ScrollView contentContainerStyle={{ flex: props.loading ? 1 : 0 }}>
      <View style={{flex: 1}}>
        <UserActionSheet
          admin={props.admin}
          userId={profileData.id}
          ref={actionSheetRef}
        />
        <ProfileHeader loading={props.loading} profile={profileData} />
        {props.loading ? (
          <ActivityIndicator size='large' style={{ flex: 1 }} />
        ) : (
          <SupProfileBody profile={profileData} />
        )}
      </View>
    </ScrollView>
  );
};

SupProScreen.navigationOptions = ({ navigation }) => {
  const selectedProfile = navigation.getParam('selectedProfile');
  const currentProfile = navigation.getParam('currentProfile');

  const headerRight = () => {
    if (!selectedProfile) {
      return <EditButton navigation={navigation} editRoute={'EditSupPro'} />;
    } else if (selectedProfile && currentProfile?.id === selectedProfile)
      return <EditButton navigation={navigation} editRoute={'EditSupPro'} />;
    else {
      return (
        <TouchableOpacity
          style={{
            transform: [{ rotate: '90deg' }],
            padding: 16,
            paddingRight: 24
          }}
          onPress={navigation.getParam('showSupProScreenActions')}
        >
          <Ellipse width='25' height='25' />
        </TouchableOpacity>
      );
    }
  };

  const headerLeft = () => {
    if (selectedProfile) {
      return <BackButton navigation={navigation} />;
    } else {
      return (
        <SettingsButton
          navigation={navigation}
          settingsRoute={'AccountSettings'}
        />
      );
    }
  };

  return {
    headerTransparent: true,
    title: '',
    headerLeft,
    headerTintColor: '#fff',
    headerRight
  };
};

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
  selectedProfile: state.selectedProfile,
  admin: state.currentUserProfile.admin,
  loading: state.pending.getProfile
});

export default connect(mapStateToProps, { getProfileData })(SupProScreen);
