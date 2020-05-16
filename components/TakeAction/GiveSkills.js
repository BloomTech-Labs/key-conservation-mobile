import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import SkillIcon from './SkillIcon';
import DownArrowIcon from './DownArrowIcon';
import RightArrowIcon from './RightArrowIcon';
import ProjectGoalIcon from './ProjectGoalIcon';
import BulletPointIcon from './BulletPointIcon';

import styles from '../../constants/TakeAction/GiveSkill';

const NeededSkills = props => {
  var skillsBubbles = [];
  
  props.neededSkills.forEach( skill => {
    skillsBubbles.push(
      <View style={styles.skill_bubble}>
        <Text style={styles.skill_label}>{skill.skill}</Text>
      </View>
    )
  });

  return <View style={styles.skill_bubble_container}>{skillsBubbles}</View>
}

const Goal = props => {
  return (
    <View style={styles.goal_container}>
      <BulletPointIcon />
      <View style={styles.goal_description_container}>
        <Text style={styles.goal_title}>{props.title}</Text>
        <Text style={styles.goal_text}>{props.text}</Text>
      </View>
    </View>
  );
}

const NeededSkillsDetailContainer = props => {
  var neededSkillsDetails = [];

  props.neededSkills.forEach( skill => {
    neededSkillsDetails.push(<NeededSkillsCard skill={skill}/>)
  })

  return <View >{neededSkillsDetails}</View>
}

class NeededSkillsCard extends React.Component {
  constructor(props) {
    super(props);

    this.skill = props.skill;

    this.goals = [];
    this.skill.goals.forEach(goal => {   
      this.goals.push(<Goal title={goal.title} text={goal.text} />);
    })
  }

  state = {
    expanded: true
  }

  handleExpand = () => {
    this.setState({
      expanded: !this.state.expanded 
    })
  }

  render() {
    return (
      <View style={styles.needed_skills_card}>
        <View style={styles.section_header}>
          <Text style={styles.skill_needed_header}>Skill Needed:</Text>
          <View>
            <View style={styles.skill_bubble}>
              <Text style={styles.skill_label}>{this.skill.skill}</Text>
            </View>
          </View>
          <View style={styles.arrow_container}>
            {this.state.expanded ? 
              <TouchableOpacity onPress={this.handleExpand}>
                <DownArrowIcon />
              </TouchableOpacity>
              
              : <TouchableOpacity onPress={this.handleExpand}>
                <RightArrowIcon />
              </TouchableOpacity>
            }
          </View>
        </View>

        {this.state.expanded ? 
          <View>
            <View style={styles.section_header}>
              <ProjectGoalIcon />
              <View style={styles.project_goal_title_container}>
                <Text style={styles.project_goal_title}>Project Goals</Text>
              </View>  
            </View>
            {this.goals}
            <TouchableOpacity
              style={ styles.buttonTouch }
              onPress={() => this.setState({
                // HANDLE THE APPLICATION PROCESS HERE
              })}
            >
              <Text style={styles.button_label}>Apply</Text>
            </TouchableOpacity>
          </View>
          : null
        }
      </View>
    );
  }
}

class GiveSkill extends React.Component {
  constructor(props) {
    super(props);
    
    this.neededSkills = props.neededSkills;
  }

  state = {
    expanded: true
  }

  handleExpand = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render() {
    if (this.neededSkills.length == 0) {
      return null;
    }
    
    return (
      <React.Fragment>
        <View style={styles.header_container}>
          <View style={styles.header_icon}>
            <SkillIcon />
          </View>
          <View >
            <Text style={styles.header_title}>Give Skills</Text>
            <Text style={styles.header_text}>Skills needed for this campaign are:</Text>
            {!this.state.expanded && <NeededSkills neededSkills={this.neededSkills} />}
          </View>
          <View>

          </View>
          <View>
            {this.state.expanded ? 
              <TouchableOpacity onPress={this.handleExpand}>
                <DownArrowIcon />
              </TouchableOpacity>

              : <TouchableOpacity onPress={this.handleExpand}>
                <RightArrowIcon />
              </TouchableOpacity>
            }
          </View>
        </View>

        {this.state.expanded && <NeededSkillsDetailContainer neededSkills={this.neededSkills} />}
      </React.Fragment>
    )
  }
}

export default GiveSkill;