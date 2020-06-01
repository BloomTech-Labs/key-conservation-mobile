import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, Alert, TextInput } from 'react-native';
import styles from '../../../../constants/CampaignBuilder/SkillImpact/SkillExpand';
import { connect } from 'react-redux';
import IdCardAlt from '../../../../assets/jsicons/IdCardAlt';
import Ballot from '../../../../assets/jsicons/Ballot';
import { Avatar } from 'react-native-elements';
import Ellipse from '../../../../assets/jsicons/Ellipse';
import ProjectGoalsFormContent from './ProjectGoalsFormContent';
import PlusSign from '../../../../assets/jsicons/headerIcons/plusSign';
import PlusSignCircle from '../../../../assets/jsicons/PlusSignCircle';

const ProjectGoalsForm = (props) => {

  const onChangeProjectContent = () =>{
    props.onChangeProjectGoal(props.projectGoals);
  };

    const projectGoalForms = props.projectGoals.map((projectGoal, index)=>{
      return (
        <ProjectGoalsFormContent
          key={index}
          index={index}
          projectGoals={props.projectGoals}
          onChangeProjectContent={onChangeProjectContent}
        />
      );
    });

    const addProjectGoal = () =>{
      const projectGoalArr = props.projectGoals;
      const projectGoalJSON = {
        description:"",
        goal_title:"",
      };
      projectGoalArr.push(projectGoalJSON);
      props.onChangeProjectGoal(projectGoalArr);
    };

  return (
    <View style={styles.itemContainers}>
      <View style={styles.itemContentBody}>
        <View style={styles.itemContentRows}>
          <View style={styles.itemContentIconContainer}>
            <Ballot />
          </View>
          <Text style={styles.itemContentTitle}>
            Project Goals
          </Text>
        </View>
        <View style={styles.itemContentRows}>
          <Text style={styles.itemBodyText}>
            What are the goals you want to accomplish while working with this
            skilled professional. Give each goal a title and fill out the exact
            details of what you want achieved. Be as clear and precise as possible.
          </Text>
        </View>
        {projectGoalForms}
        <View style={styles.itemContentRows}>
          <View style={styles.avatarImageContainer}>
            <View style={styles.leftLineAddGoal}/>
            <View style={styles.rightEllipseContainer}>
              <TouchableOpacity
                style={styles.ellipseIndicator}
                onPress={addProjectGoal}
              >
                <View style={styles.plusSign}>
                <PlusSign/>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.elementRightContainer}
            onPress={addProjectGoal}
          >
            <Text style={styles.textInput}>
              Add another goal
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  currentUserProfile: state.currentUserProfile,
});
export default connect(mapStateToProps)
(ProjectGoalsForm);
