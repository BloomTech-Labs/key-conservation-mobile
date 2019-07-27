import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { getCampaigns } from '../store/actions';

import { Icon } from 'react-native-elements';

import Campaign from '../components/FeedScreen/Campaign';

import styles from '../constants/Stylesheet';

function FeedScreen(props) {
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
      <View style={styles.feedContainer}>
        {allCampaigns.length > 0 &&
          allCampaigns.map(campaign => {
            return (
              <Campaign
                key={campaign.camp_id}
                data={campaign}
                handlePress={handlePress}
                navigation={navigation}
              />
            );
          })}
      </View>
    </ScrollView>
  );
}

FeedScreen.navigationOptions = {
  title: 'Feed',
  headerRight: <Icon name='search' type='font-awesome' /> // Find out how to implement this better// And how to style this!
};

export default FeedScreen;
