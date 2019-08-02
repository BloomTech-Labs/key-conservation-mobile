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

  return (
    <ScrollView>
      <View style={styles.feedContainer}>
        {allCampaigns.length > 0 &&
          allCampaigns.map(campaign => {
            return (
              <Campaign
                key={campaign.camp_id}
                data={campaign}
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
  // headerRight: <Icon name='search' type='font-awesome' />, // Find out how to implement this better. And how to style this!
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

export default FeedScreen;
