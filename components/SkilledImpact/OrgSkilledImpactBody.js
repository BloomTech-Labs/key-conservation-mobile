import React, { forwardRef } from 'react';
import { View, Text, TouchableOpacity, Switch, Linking, Animated, Alert } from 'react-native';
import Expand from 'react-native-simple-expand';
import Sync from '../../assets/jsicons/bottomnavigation/Sync';
import ChevronRight from '../../assets/jsicons/miscIcons/ChevronRight';
import ChevronBottom from '../../assets/jsicons/miscIcons/ChevronBottom';
import styles from '../../constants/SkilledImpact/OrgSkilledImpactBody';
import SkillContent from './elements/SkillContent';
import CampaignContent from './elements/CampaignContent';
import OurSkillImpactGroup from './elements/OurSkillImpactGroup';

class OrgSkilledImpactBody extends React.Component {
  constructor(props) {
    //TODO props edits and states
    super(props);
    this.state = {
      userData: props.userData,
      skills: props.skills
    };
  }

  render() {
    const skillsList = this.state.skills;
    const campaignList = this.state.userData.campaigns;
    return (
      <View style={styles.container}>
        <View style={styles.itemContainers}>
          <View style={styles.fullWidthButtonContainer}>
            <TouchableOpacity style={styles.fullWidthButton}>
              <Text style={styles.buttonText}>SEARCH FOR SKILLED HELP</Text>
            </TouchableOpacity>
          </View>
        </View>
        <SkillContent skills={skillsList}/>
        <CampaignContent campaigns={campaignList}/>
        <OurSkillImpactGroup />
      </View>
    );
  }
}

export default OrgSkilledImpactBody;
