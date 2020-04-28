import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from '../../../constants/Profile/tabs/Campaigns';

import FeedUpdate from '../../FeedScreen/FeedUpdate';
import FeedCampaign from '../../FeedScreen/FeedCampaign';

import CampaignBlankSpace from '../CampaignBlankSpace';
import CampaignList from './CampaignList';
import NoSavedPosts from '../../Profile/NoSavedPosts';

const Campaigns = (props) => {
  const profileData = props.profile;

  return (
    <View>
      {profileData?.roles === 'supporter' ? (
        <View style={styles.container}>
          {props.bookmarks.length ? <CampaignList /> : <NoSavedPosts />}
        </View>
      ) : profileData.campaigns?.length ? (
        profileData.campaigns?.map((campaign) => {
          if (campaign) {
            return (
              <View style={styles.currentCampaigns} key={campaign.id}>
                <FeedCampaign disableHeader data={campaign} toggled />
              </View>
            );
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

const mapStateToProps = (state) => {
  return {
    bookmarks: state.bookmarks.campaignIDs,
  };
};

export default connect(mapStateToProps, {})(Campaigns);
