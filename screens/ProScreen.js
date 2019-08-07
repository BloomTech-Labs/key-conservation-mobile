import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';
import { ScrollView } from "react-navigation";
import { useSelector, useDispatch } from 'react-redux';

import { getProfileData } from '../store/actions';

import { Avatar, Icon, ListItem } from 'react-native-elements';

import ProfileHeader from '../components/Profile/ProfileHeader';

const ProScreen = props => {
  let { selectedProfile } = useSelector(state => state);
  const dispatch = useDispatch();
  const { navigation } = props;
  const orgId = props.navigation.getParam('orgId');

  return (
    <ScrollView>
      <ProfileHeader navigation={navigation} profile={selectedProfile} myProfile={false} />
      <View />
      <View>
        {selectedProfile.campaigns.map(campaign => {
          return (
            <ListItem
              key={campaign.camp_id}
              title={campaign.camp_name}
              leftAvatar={{ source: { uri: campaign.camp_img } }}
              subtitle={campaign.location}
              // rightIcon={
              //   <Icon name='ellipsis-v' type='font-awesome' color='black' />
              // }
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

ProScreen.navigationOptions = {
  title: 'My Profile',
  // This setting needs to be on every screen so that header is in the center
  // This is fix for andriod devices should be good on IOS
  headerTitleStyle: {
    textAlign: 'center',
    flexGrow: 1,
    alignSelf: 'center'
  }
};

export default ProScreen;
