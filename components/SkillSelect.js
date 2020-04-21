import React from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';

import styles from '../constants/SkillSelect';

const Skills = {
  ACCOUNTING: 'Accounting',
  ARCHITECTURE: 'Architecture',
  AUTO: 'Auto',
  APP_DEVELOPMENT: 'App Development',
  ART: 'Art',
  AVIATION: 'Aviation',
  BOATING: 'Boating',
  BUSINESS_DEVELOPMENT: 'Business Development',
  COMMUNICATION: 'Communication',
  COMMUNITY_LIAISON: 'Community Liaison',
  CONSTRUCTION: 'Construction',
  CRAFT: 'Craft',
  CULINARY: 'Culinary',
  DATA_ANALYSIS: 'Data Analysis',
  DATABASE_MANAGEMENT: 'Database Management',
  DIVING: 'Diving',
  DRONE: 'Drone',
  ELECTRICITY: 'Electricity',
  ENGINEERING: 'Engineering',
  ENTREPRENEURSHIP: 'Entrepreneurship',
  FINANCE: 'Finance',
  FUNDRAISING: 'Fundraising',
  GAMING: 'Gaming',
  GRAPHIC_DESIGN: 'Graphic Design',
  HOSPITALITY: 'Hospitality',
  HUMAN_RESOURCES: 'Human Resources',
  INFORMATION_TECHNOLOGY: 'Information Technology',
  LANDSCAPE: 'Landscape',
  LEGAL: 'Legal',
  MANAGEMENT: 'Management',
  MARKETING: 'Marketing',
  MEDICAL: 'Medical',
  MUSICAL: 'Musical',
  PHOTOGRAPHY: 'Photography',
  PLUMBING: 'Plumbing',
  PUBLIC_RELATIONS: 'Public Relations',
  RENEWABLE_ENERGY: 'Renewable Energy ',
  RESEARCH: 'Research',
  SOCIAL_MEDIA: 'Social Media',
  STRATEGY_CONSULTING: 'Strategy Consulting',
  TAXI: 'Taxi',
  TRANSLATION: 'Translation',
  VETERINARY_SERVICES: 'Veterinary Services',
  VIDEOGRAPHY: 'Videography',
  WEB_DESIGN: 'Web Design',
  WEB_DEVELOPMENT: 'Web Development',
  WRITING: 'Writing',
}

const SkillButton = props => {
  const { skill, selected, onPress } = props;

  return (
    <TouchableOpacity
      style={selected ? styles.selectedContainer : styles.unselectedContainer}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {Skills[skill].toUpperCase()}
      </Text>
    </TouchableOpacity>
  )
};

class SkillSelect extends React.Component {
  constructor(props) {
    super(props);
    this.onSkillsChanged = props.onSkillsChanged;

    this.state = {
      selectedSkills: props.skills || [],
      otherSkill: ''
    }
  }

  toggleSkill(skill) {
    const newSkills = this.state.selectedSkills.includes(skill)
      ? this.state.selectedSkills.filter(selectedSkill => selectedSkill !== skill)
      : this.state.selectedSkills.concat(skill);

    this.setState({ selectedSkills: newSkills });

    this.onSkillsChanged(newSkills);
  }

  render() {
    const skills = Object.keys(Skills).map(skill =>
      <SkillButton key={skill} skill={skill} selected={this.state.selectedSkills.includes(skill)} onPress={() => this.toggleSkill.call(this, skill)} />
    );
    const otherSkills = <View style={styles.otherSkillContainer}>
      <View style={styles.otherSkillLabelsContainer}>
        <View style={styles.otherSkillTitleContainer}>
          <Text style={styles.text}>OTHER</Text>
        </View>
        <Text style={styles.otherSkillText}>Are we missing a skill you'd like to give? Let us know here and we will consider it for our next update!</Text>
      </View>
      <TextInput
        // ref={input => {
        //   this.otherSkillInput = input;
        // }}
        returnKeyType='next'
        placeholder='Hula Dancing'
        style={styles.inputField}
        onChangeText={text => this.setState({ otherSkill: text })}
        // onSubmitEditing={() => {
        //   if (Platform.OS === 'android') return;
        //   this.otherSkillInput.focus();
        // }}
        value={this.state.otherSkill}
      />
    </View>;

    return (
      <View>
        <View style={styles.list}>
          {skills}
        </View>
        {this.props.enableOtherSkills && otherSkills}
      </View>
    )
  }
}

export default SkillSelect;