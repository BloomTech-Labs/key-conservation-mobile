import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Skills } from '../constants/Skills';
import styles from '../constants/SkillSelect';

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
      selectedSkills: props.skills || []
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
    return (
      <View style={styles.list}>
      {skills}
      </View>
    )
  }
}

export default SkillSelect;
