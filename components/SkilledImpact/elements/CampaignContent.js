import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../../constants/SkilledImpact/OrgSkilledImpactBody';
import ChevronRight from '../../../assets/jsicons/miscIcons/ChevronRight';
import { Avatar } from 'react-native-elements';
import * as moment from 'moment';

export default React.forwardRef((props, ref) => {
   const campaign = props.campaign;

    return (
      <View style={styles.itemContentRows}>
        <View style={styles.avatarImageContainer}>
          <Avatar
            size={65}
            rounded
            source={{
              uri: campaign.image || undefined
            }}
          />
        </View>
        <View style={styles.campaignRightContainer}>
          <View style={styles.campaignRow}>
            {campaign.name? (
              <Text style={styles.campaignOrganizationName}>
                {campaign.name}
              </Text>
            ):(
              <Text style={styles.campaignOrganizationName}>
                {campaign.org_name}
              </Text>
            )}
            <View style={styles.chevronArrowContainer}>
              <ChevronRight />
            </View>
          </View>
          <View style={styles.campaignRow}>
            {campaign.is_deactivated ?
              (<View style={styles.closeTag}>
                <Text style={styles.closeText}>CLOSE</Text>
              </View>):
              (<View style={styles.openTag}>
                <Text style={styles.mediumButtonText}>OPEN</Text>
              </View>)}
          </View>
          <View style={styles.campaignRowFooter}>
            <Text style={styles.intervalPostedText}>{moment.utc(campaign.created_at).local().startOf('seconds').fromNow()}</Text>
          </View>
        </View>
      </View>
    );

});