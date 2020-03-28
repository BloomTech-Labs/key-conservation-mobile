import React from 'react';
import { View, Text } from 'react-native';

import styles from '../../../constants/Profile/tabs/Campaigns';

import FeedUpdate from '../../FeedScreen/FeedUpdate';
import FeedCampaign from '../../FeedScreen/FeedCampaign';

import CampaignBlankSpace from '../CampaignBlankSpace';
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
        profileData.campaigns?.map(campaign => {
          if (campaign) {
            return (
                <FeedCampaign
                    disableHeader
                    key={campaign.id}
                    data={campaign}
                    toggled
                />
            )
          }
        })
      ) : (
        <View style={styles.container}>
          <CampaignBlankSpace />
        </View>
      )}
    </View>
  );
};

export default Campaigns;
