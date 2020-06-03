import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
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
  const [expanded, setExpand] = useState(false);
  const [SlideInFirst, setSlideInFirst] = useState(new Animated.Value(0));
  const [SlideInSecond, setSlideInSecond] = useState(new Animated.Value(0));
  const [SlideInThird, setSlideInThird] = useState(new Animated.Value(0));
  const [FirstAnimationVal, setFirstAnimationVal] = useState( [0, 0]);
  const [SecondAnimationVal, setSecondAnimationVal] = useState([0, 0]);
  const [ThirdAnimationVal, setThirdAnimationVal] = useState([0, 0]);

  const toggleExpand = () =>{
     if(expanded){
       setExpand(!expanded);
     }else{
       setExpand(!expanded);
       setFirstAnimationVal([-40, 0]);
       setSecondAnimationVal([-250, 0]);
       setThirdAnimationVal([-650, 0]);
       _start();
     }
  };

  const onChangeProjectGoal=(projectGoal)=>{
    props.skillImpactRequests.get(props.skill).project_goals = projectGoal;
    props.onChangeSkills(props.skillImpactRequests);
  };

  const onChangeOurContribution = (ourContribution) =>{
    props.skillImpactRequests.get(props.skill).our_contribution = ourContribution;
    props.onChangeSkills(props.skillImpactRequests);
  };

  const _start = () => {
    Animated.parallel([
      Animated.timing(SlideInFirst, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(SlideInSecond, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      }),
      Animated.timing(SlideInThird, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      })
    ]).start();
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
          <Animated.View
            style={{
              transform: [
                {
                  translateY: SlideInFirst.interpolate({
                    inputRange: [0, 1],
                    outputRange: FirstAnimationVal
                  })
                }
              ],
              flex: 1,
            }}
          >
        <PointOfContactForm
          skillImpactRequests={props.skillImpactRequests}
          skill={props.skill}
          onChangeSkills={props.onChangeSkills}
        />
          </Animated.View>
          <Animated.View
            style={{
              transform: [
                {
                  translateY: SlideInSecond.interpolate({
                    inputRange: [0, 1],
                    outputRange: SecondAnimationVal
                  })
                }
              ],
              flex: 1,
            }}
          >
        <ProjectGoalsForm
          projectGoals={props.skillImpactRequests.get(props.skill).project_goals}
          onChangeProjectGoal={projectGoal => onChangeProjectGoal(projectGoal)}
        />
          </Animated.View>
          <Animated.View
            style={{
              transform: [
                {
                  translateY: SlideInThird.interpolate({
                    inputRange: [0, 1],
                    outputRange: ThirdAnimationVal
                  })
                }
              ],
              flex: 1,
            }}
          >
        <OurContributionForm
          ourContribution={props.skillImpactRequests.get(props.skill).our_contribution}
          onChangeContribution={ourContribution => onChangeOurContribution(ourContribution)}
        />
          </Animated.View>
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
