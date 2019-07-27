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

import { getCampaigns } from '../store/actions';

import { Avatar, Icon, ListItem } from 'react-native-elements';

import ProfileHeader from '../components/Profile/ProfileHeader';

const ProScreen = props => {
  let { allCampaigns } = useSelector(state => state);
  const dispatch = useDispatch();
  const { navigation } = props;

  useEffect(() => {
    dispatch(getCampaigns());
  }, []);

  const handlePress = orgId => {
    navigation.navigate('Pro', { orgId });
  };

  return (
    <ScrollView>
      <ProfileHeader />
      <View />
      <View>
        {allCampaigns.map(campaign => {
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

ProScreen.navigationOptions = {
  title: 'Profile'
};

export default ProScreen;
