import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../constants/SkilledImpact/OrgSkilledImpactBody';
import SkillsExpand from './elements/SkillsExpand';
import CampaignExpand from './elements/CampaignExpand';
import OurSkillImpactGroupExpand from './elements/OurSkillImpactGroupExpand';

export default React.forwardRef((props, ref) => {
  const userData = props.userData;
  const skillsList = props.userData.skills;
  const campaignList = props.userData.campaigns;
  const isAcceptingHelp = props.userData.accepting_help_requests;

    return (
      <View style={styles.container}>
        <View style={styles.itemContainers}>
          <View style={styles.fullWidthButtonContainer}>
            <TouchableOpacity style={styles.fullWidthButton}>
              <Text style={styles.buttonText}>SEARCH FOR SKILLED HELP</Text>
            </TouchableOpacity>
          </View>
        </View>
        <SkillsExpand
          userData={userData}
          skills={skillsList}
          isAcceptingHelp={isAcceptingHelp}
        />
        <CampaignExpand campaigns={campaignList}/>
        <OurSkillImpactGroupExpand />
      </View>
    );
});