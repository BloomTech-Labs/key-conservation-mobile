import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../constants/SkilledImpact/OrgSkilledImpactBody';
import SkillsExpand from './elements/SkillsExpand';
import CampaignExpand from './elements/CampaignExpand';
import OurSkillImpactGroupExpand from './elements/OurSkillImpactGroupExpand';

class OrgSkilledImpactBody extends React.Component {
  constructor(props) {
    //TODO props edits and states
    super(props);
    this.state = {
      userData: props.userData,
    };
  }

  render() {
    const skillsList = this.state.userData.skills;
    const campaignList = this.state.userData.campaigns;
    const isAcceptingHelp = this.state.userData.accepting_help_requests;
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
          skills={skillsList}
          isAcceptingHelp={isAcceptingHelp}
        />
        <CampaignExpand campaigns={campaignList}/>
        <OurSkillImpactGroupExpand />
      </View>
    );
  }
}

export default OrgSkilledImpactBody;
