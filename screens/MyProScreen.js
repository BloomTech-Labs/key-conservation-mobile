import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import { getProfileData } from '../store/actions';

import { Avatar, Icon, ListItem } from 'react-native-elements';

import ProfileHeader from '../components/Profile/ProfileHeader';

const MyProScreen = props => {
  let { currentUser } = useSelector(state => state);
  const dispatch = useDispatch();
  const { navigation } = props;

  useEffect(() => {
    dispatch(getProfileData(currentUser.id, false, 'myProfile'));
  }, []);

  return (
    <ScrollView>
      <ProfileHeader
        navigation={navigation}
        myProfile={true}
        profile={currentUser.profile}
      />
      <View />
      <View>
        {currentUser.profile.campaigns.map(campaign => {
          return (
            <ListItem
              key={campaign.camp_id}
              title={campaign.username}
              leftAvatar={{ source: { uri: campaign.camp_img } }}
              subtitle={campaign.location}
              rightIcon={
                <Icon name='ellipsis-v' type='font-awesome' color='black' />
              }
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

MyProScreen.navigationOptions = {
  title: `My Profile`,
  // This setting needs to be on every screen so that header is in the center
  // This is fix for andriod devices should be good on IOS
  headerStyle: {
    backgroundColor: '#323338'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    textAlign: 'center',
    flexGrow: 1,
    alignSelf: 'center'
  }
};

export default MyProScreen;
