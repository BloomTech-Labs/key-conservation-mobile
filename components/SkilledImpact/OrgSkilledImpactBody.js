import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
