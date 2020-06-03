import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, Alert, TextInput } from 'react-native';
import styles from '../../../constants/CampaignBuilder/SkillImpact/SkillExpand';
import Sync from '../../../assets/jsicons/bottomnavigation/Sync';
import ChevronBottom from '../../../assets/jsicons/miscIcons/ChevronBottom';
import ChevronRight from '../../../assets/jsicons/miscIcons/ChevronRight';
import { connect } from 'react-redux';
import Skills from '../../../constants/Skills';
import PointOfContactForm from './elements/PointOfContactForm';
import ProjectGoalsForm from './elements/ProjectGoalsForm';
import OurContributionForm from './elements/OurContributionForm';

const SkillButton = props => {
  const { skill } = props;

  return (
    <TouchableOpacity
      style={styles.buttonSelectedContainer}
    >
      <Text style={styles.skillButtonText}>
        {Skills[skill].toUpperCase()}
      </Text>
    </TouchableOpacity>
  )
};
const SkillDescriptionForm = (props) => {
  const [expanded, setExpand] = useState(true);

  const toggleExpand = () =>{
    setExpand(!expanded)
  };

  const onChangeProjectGoal=(projectGoal)=>{
    props.skillImpactRequests.get(props.skill).project_goals = projectGoal;
    props.onChangeSkills(props.skillImpactRequests);
  };

  const onChangeOurContribution = (ourContribution) =>{
    props.skillImpactRequests.get(props.skill).our_contribution = ourContribution;
    props.onChangeSkills(props.skillImpactRequests);
  };

  return (
    <View style={styles.bigContainer}>
    <View style={styles.itemContainers}>
      <TouchableOpacity style={styles.itemTitleRow} onPress={toggleExpand}>
        <Sync/>
        <Text style={styles.itemTitleText}>
          Skill Needed
        </Text>
        <SkillButton skill={props.skill} selected={true} />
        <View style={styles.chevronArrowContainer}>
          {expanded ? <ChevronBottom/>:<ChevronRight/>}
        </View>
      </TouchableOpacity>
    </View>
      {expanded ? (
        <View style={styles.bigContainer}>
        <PointOfContactForm
          skillImpactRequests={props.skillImpactRequests}
          skill={props.skill}
          onChangeSkills={props.onChangeSkills}
        />
        <ProjectGoalsForm
          projectGoals={props.skillImpactRequests.get(props.skill).project_goals}
          onChangeProjectGoal={projectGoal => onChangeProjectGoal(projectGoal)}
        />
        <OurContributionForm
          ourContribution={props.skillImpactRequests.get(props.skill).our_contribution}
          onChangeContribution={ourContribution => onChangeOurContribution(ourContribution)}
        />
        </View>
      ) : null}
    </View>
  );
};

const mapStateToProps = (state) => ({
  currentUserProfile: state.currentUserProfile,
});
export default connect(mapStateToProps)
(SkillDescriptionForm);
