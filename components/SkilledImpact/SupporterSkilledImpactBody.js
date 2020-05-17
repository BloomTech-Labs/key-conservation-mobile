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
      isAcceptingHelp: props.data.isAcceptingHelp,
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
      <View style={styles.container}>
        <SkillContent
          skills={this.state.skills}
          isAcceptingHelp={this.state.isAcceptingHelp}
          userId={this.state.userId}
          navigation={this.props.navigation}
        />
        <CampaignContent campaigns={this.state.campaigns} />
        <SkillGroupContent skillGroups={this.state.skills} />
        <ApplicationContent submissions={this.state.submissions} />
      </View>
    );
  }
}

export default SupporterSkilledImpactBody;
