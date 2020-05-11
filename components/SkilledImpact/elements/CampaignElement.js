import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import styles from '../../../constants/SkilledImpact/CampaignContent';
import ChevronRight from '../../../assets/jsicons/miscIcons/ChevronRight';
import { Avatar } from 'react-native-elements';
import * as moment from 'moment';

class CampaignElement extends Component {
  render() {
    return (
      <View style={styles.itemContentRows}>
        <View style={styles.avatarImageContainer}>
          <Avatar
            size={65}
            rounded
            source={{
              uri: this.props.campaign.image || undefined,
            }}
          />
        </View>
        <View style={styles.campaignRightContainer}>
          <View style={styles.campaignRow}>
            {this.props.campaign.name ? (
              <Text style={styles.campaignOrganizationName}>
                {this.props.campaign.name}
              </Text>
            ) : (
              <Text style={styles.campaignOrganizationName}>
                {this.props.campaign.org_name}
              </Text>
            )}
            <View style={styles.chevronArrowContainer}>
              <ChevronRight />
            </View>
          </View>
          <View style={styles.campaignRow}>
            {this.props.campaign.is_deactivated ? (
              <View style={styles.closeTag}>
                <Text style={styles.closeText}>CLOSE</Text>
              </View>
            ) : (
              <View style={styles.openTag}>
                <Text style={styles.mediumButtonText}>OPEN</Text>
              </View>
            )}
          </View>
          <View style={styles.campaignRowFooter}>
            <Text style={styles.intervalPostedText}>
              {moment
                .utc(this.props.campaign.created_at)
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
export default CampaignElement;
