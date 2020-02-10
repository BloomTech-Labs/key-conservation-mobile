import React, {useEffect, useRef} from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getProfileData } from '../store/actions';
import SupProfileHeader from '../components/Profile/SupProfileHeader';
import SupProfileBody from '../components/Profile/SupProfileBody';
import BackButton from '../components/BackButton';
import Ellipse from '../assets/jsicons/Ellipse';

import UserActionSheet from '../components/Reports/UserActionSheet';

const SupProScreen = props => {

  const actionSheetRef = useRef(null);

  const showActionSheet = () => {
    actionSheetRef.current?.show();
  };
  
  const onMount = () => {
    props.navigation.setParams({
      showSupProScreenActions: showActionSheet
    });
  }

  useEffect(onMount, []);

  return (
    <View>
      <UserActionSheet 
        admin={props.admin}
        userId={props.selectedProfile.id}
        ref={actionSheetRef}
      />
      <SupProfileHeader profile={props.selectedProfile} />
      <SupProfileBody profile={props.selectedProfile} />
    </View>
  );
};

SupProScreen.navigationOptions = navigationData => {
  const username = navigationData.navigation.getParam('username');

  return {
    headerTransparent: true,
    title: '',
    headerLeft: () => <BackButton navigation={navigationData.navigation} />,
    // headerStyle: {
    //   backgroundColor: 'red'
    // },
    headerTintColor: '#fff',
    headerRight: () => (
      <TouchableOpacity
        style={{
          transform: [{ rotate: '90deg' }],
          padding: 16,
          paddingRight: 24
        }}
        onPress={navigationData.navigation.getParam('showSupProScreenActions')}
      >
        <Ellipse width='25' height='25' />
      </TouchableOpacity>
    )
  };
};

const mapStateToProps = state => ({
  selectedProfile: state.selectedProfile,
  admin: state.currentUserProfile.admin
});
const optionsStyles = {
  optionsContainer: {
    width: 75
  }
};

export default connect(mapStateToProps, { getProfileData })(SupProScreen);
