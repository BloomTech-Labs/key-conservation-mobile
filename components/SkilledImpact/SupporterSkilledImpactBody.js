import React, { Component } from 'react';
import { View } from 'react-native';
import styles from '../../constants/SkilledImpact/SupporterSkilledImpactBody';
import CampaignContent from '../../components/SkilledImpact/elements/CampaignContent';
import SkillContent from '../../components/SkilledImpact/elements/SkillContent';
import ApplicationContent from '../../components/SkilledImpact/elements/ApplicationContent';
import SkillGroupContent from '../../components/SkilledImpact/elements/SkillGroupContent';

class SupporterSkilledImpactBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
      campaigns: props.data.campaigns,
      submissions: props.data.submissions,
      skills: props.data.skills,
    };
    this.toggleSwitch = this.toggleSwitch.bind(this);
  }

  toggleSwitch() {
    this.setState({
      isEnabled: !this.state.isEnabled,
    });
  }

  render() {
    return (
      <View style={styles.body}>
        <SkillContent skills={this.state.skills} isAcceptingHelp={true} />
        <CampaignContent campaigns={this.state.campaigns} />
        <SkillGroupContent
          skillGroups={{
            skills: this.state.skills,
            campaigns: this.state.campaigns,
          }}
        />
        <ApplicationContent submissions={this.state.submissions} />
      </View>
    );
  }
}

export default SupporterSkilledImpactBody;
