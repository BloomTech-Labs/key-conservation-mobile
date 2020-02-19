import React from 'react';
import { View, Text } from 'react-native';

import styles from '../../../constants/Profile/tabs/Campaigns';

import FeedUpdate from '../../FeedScreen/FeedUpdate';
import FeedCampaign from '../../FeedScreen/FeedCampaign';

import CampBlankSpace from '../../Profile/CampBlankSpace';

const Campaigns = props => {
  const profileData = props.profile;

  return (
    <View>
      {!profileData.campaigns?.length ? (
        <View style={styles.container}>
          <CampBlankSpace />
          <Text style={styles.text}>No campaigns to see here!</Text>
        </View>
      ) : null}
      {profileData.campaigns?.map(camp => {
        if (camp.update_id) {
          return (
            <FeedUpdate
              disableHeader
              key={`update${camp.update_id}`}
              data={camp}
              toggled
            />
          );
        } else {
          return (
            <FeedCampaign
              disableHeader
              key={camp.camp_id}
              data={camp}
              toggled
            />
          );
        }
      })}
    </View>
  );
};

export default Campaigns;
