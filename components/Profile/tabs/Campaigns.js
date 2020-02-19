import React from 'react';
import { View, Text } from 'react-native';

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
        <View>
          {!profileData.campaigns?.length ? (
            <View style={styles.container}>
              <ComingSoon />
              {/* <CampBlankSpace /> */}
            </View>
          ) : null}
          {profileData.campaigns?.map(camp => {
            if (camp.update_id) {
              return (
                <FeedUpdate
                  key={`update${camp.update_id}`}
                  data={camp}
                  toggled
                />
              );
            } else {
              return <FeedCampaign key={camp.camp_id} data={camp} toggled />;
            }
          })}
        </View>
      ) : (
        <View>
          {!profileData.campaigns?.length ? (
            <View style={styles.container}>
              <CampBlankSpace />
            </View>
          ) : null}
          {profileData.campaigns?.map(camp => {
            if (camp.update_id) {
              return (
                <FeedUpdate
                  key={`update${camp.update_id}`}
                  data={camp}
                  toggled
                />
              );
            } else {
              return <FeedCampaign key={camp.camp_id} data={camp} toggled />;
            }
          })}
        </View>
      )}
    </View>
  );
};

export default Campaigns;
