import React, { useEffect } from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import FeedCampaign from '../../FeedScreen/FeedCampaign';
import styles from '../../../constants/Profile/tabs/Campaigns';

import { fetchBookmarkedCampaigns } from '../../../store/actions';

const CampaignList = ({ bookmarks, fetchBookmarkedCampaigns }) => {
  useEffect(() => {
    fetchBookmarkedCampaigns(bookmarks.campaignIDs);
  }, []);

  return (
    <>
      {bookmarks.loading ? (
        <ActivityIndicator
          size="large"
          color="#ADADAD"
          style={{ marginTop: Dimensions.get('screen').height * 0.175 }}
        />
      ) : (
        bookmarks.campaigns.map((campaign) => (
          <View key={campaign.id} style={styles.currentCampaigns}>
            <FeedCampaign
              displayOn="profile"
              disableHeader
              key={campaign.id}
              data={campaign}
              toggled
            />
          </View>
        ))
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userID: state.currentUserProfile.id,
    bookmarks: state.bookmarks,
  };
};

export default connect(mapStateToProps, { fetchBookmarkedCampaigns })(
  CampaignList
);
