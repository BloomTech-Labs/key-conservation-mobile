import React from 'react';
import { Button, View } from 'react-native';

import { Skills } from '../constants/Skills';

const SkillButton = props => {
  const { skill, selected, onPress } = props;

  return (
    <Button
      color={selected ? 'green' : 'white'} // todo
      title={Skills[skill].toUpperCase()}
      onPress={onPress} />
  )
};

class SkillSelect extends React.Component {
  constructor(props) {
    super(props);
    this.onSkillsChanged = props.onSkillsChanged;

    this.state = {
      selectedSkills: props.initialSkills || []
    }
  }

  toggleSkill(skill) {
    if (this.state.selectedSkills.includes(skill)) {
      this.setState(state => ({
        selectedSkills: state.selectedSkills.filter(selectedSkill => selectedSkill !== skill)
      }));
    } else {
      this.setState(state => ({
        selectedSkills: state.selectedSkills.concat(skill)
      }));
    }

    this.onSkillsChanged(this.state.selectedSkills);
  }

  render() {
    return (
      <View
        style={{ // todo

        }}>
        {
          Object.keys(Skills).map(skill =>
            <SkillButton skill={skill} selected={skill === this.selectedSkill} onPress={this.setSkill.call(this)} />
          )
        }
      </View>
    )
  }
}

export default SkillSelect;
