import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getProfileData } from '../store/actions';
import SupProfileHeader from '../components/Profile/SupProfileHeader';
import SupProfileBody from '../components/Profile/SupProfileBody';
import BackButton from '../components/BackButton';
import Ellipse from '../assets/jsicons/Ellipse';

import UserActionSheet from '../components/Reports/UserActionSheet';
import EditButton from '../components/EditButton';
import SettingsButton from '../components/SettingsButton';
import { ScrollView } from 'react-native-gesture-handler';

const SupProScreen = props => {
  const actionSheetRef = useRef(null);

  const showActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const onMount = () => {
    props.navigation.setParams({
      showSupProScreenActions: showActionSheet,
      currentProfile: props.currentUserProfile
    });

    return () => {
      // Clear selectedProfile if any
      console.log('clearing');
      props.navigation.setParams({ selectedProfile: null });
    };
  };

  useEffect(onMount, []);

  const profileData =
    props.navigation.getParam('selectedProfile') || props.currentUserProfile;

  return (
    <ScrollView>
      <View>
        <UserActionSheet
          admin={props.admin}
          userId={props.selectedProfile.id}
          ref={actionSheetRef}
        />
        <SupProfileHeader profile={profileData} />
        <SupProfileBody profile={profileData} />
      </View>
    </ScrollView>
  );
};

SupProScreen.navigationOptions = ({ navigation }) => {
  const selectedProfile = navigation.getParam('selectedProfile');
  const currentProfile = navigation.getParam('currentProfile');

  const headerRight = () => {
    if (currentProfile && !selectedProfile) {
      return <EditButton navigation={navigation} editRoute={'EditSupPro'} />;
    } else if (selectedProfile && currentProfile?.id === selectedProfile?.id)
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
  admin: state.currentUserProfile.admin
});

export default connect(mapStateToProps, { getProfileData })(SupProScreen);
