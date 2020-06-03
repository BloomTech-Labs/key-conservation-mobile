import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import styles from '../../../../constants/CampaignBuilder/SkillImpact/SkillExpand';
import { connect } from 'react-redux';

const ProjectGoalsFormContent = (props) => {

  const onChangeGoalTitle = (text) =>{
    const modifiedProjectGoal = props.projectGoals[props.index];
    modifiedProjectGoal.goal_title = text;
    props.onChangeProjectContent(modifiedProjectGoal);
  };

  const onChangeDescription = (text) =>{
    props.projectGoals[props.index].description = text;
    props.onChangeProjectContent(props.projectGoals);
  };

  return (
    <View style={styles.itemContentRows}>
      <View style={styles.avatarImageContainer}>
        <View style={styles.leftLine}/>
        <View style={styles.rightEllipseContainer}>
          <View style={styles.ellipseIndicator}/>
        </View>
      </View>
      <View style={styles.elementRightContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Goal Title"
          onChangeText={text => onChangeGoalTitle(text)}
          value={props.projectGoals[props.index].goal_title}
        />
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.goalDescriptionBox}
          placeholder="Description of goal"
          onChangeText={text => onChangeDescription(text)}
          value={props.projectGoals[props.index].description}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  currentUserProfile: state.currentUserProfile,
});
export default connect(mapStateToProps)
(ProjectGoalsFormContent);
