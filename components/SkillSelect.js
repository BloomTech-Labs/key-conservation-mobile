import React from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';

import styles from '../constants/SkillSelect/SkillSelect';
import Skills from '../constants/Skills';

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
        returnKeyType='next'
        placeholder='Hula Dancing'
        style={styles.inputField}
        onChangeText={text => this.setState({ otherSkill: text })}
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