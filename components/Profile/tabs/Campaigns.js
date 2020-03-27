import React from 'react';
import { View } from 'react-native';

import styles from '../../../constants/Profile/tabs/Campaigns';

import FeedUpdate from '../../FeedScreen/FeedUpdate';
import FeedCampaign from '../../FeedScreen/FeedCampaign';

import CampBlankSpace from '../../Profile/CampBlankSpace';
import ComingSoon from '../../Profile/ComingSoon';

const Campaigns = props => {
  const profileData = props.profile;

  return (
    <View>
      {profileData?.roles === 'supporter' ? (
        <View style={styles.container}>
          <ComingSoon />
        </View>
      ) : profileData.campaigns?.length ? (
        profileData.campaigns?.map(camp => {
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
        })
      ) : (
        <View style={styles.container}>
          <CampBlankSpace />
        </View>
      )}
    </View>
  );
};

export default Campaigns;
