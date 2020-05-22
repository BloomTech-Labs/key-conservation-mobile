import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from '../../../constants/SkilledImpact/CampaignContent';
import ChevronRight from '../../../assets/jsicons/miscIcons/ChevronRight';
import { Avatar } from 'react-native-elements';
import * as moment from 'moment';

class ApplicationElement extends Component {
  render() {
    return (
      <View style={styles.itemContentRows}>
        <View style={styles.avatarImageContainer}>
          <Avatar
            size={65}
            rounded
            source={{
              uri: this.props.submission.profile_image || undefined,
            }}
          />
        </View>
        <View style={styles.campaignRightContainer}>
          <View style={styles.campaignRow}>
            <Text style={styles.campaignOrganizationName}>
              {this.props.submission.campaign.name}
            </Text>
            <View style={styles.chevronArrowContainer}>
              <ChevronRight />
            </View>
          </View>
          <View style={styles.campaignRowFooter}>
            <Text style={styles.intervalPostedText}>
              {moment
                .utc(this.props.submission.campaign.created_at)
                .local()
                .startOf('seconds')
                .fromNow()}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
export default ApplicationElement;
