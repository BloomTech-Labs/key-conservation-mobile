import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, Alert } from 'react-native';
import styles from '../../../constants/SkilledImpact/OrgSkilledImpactBody';
import Sync from '../../../assets/jsicons/bottomnavigation/Sync';
import ChevronBottom from '../../../assets/jsicons/miscIcons/ChevronBottom';
import ChevronRight from '../../../assets/jsicons/miscIcons/ChevronRight';
import { editProfileData } from '../../../store/actions';
import { connect, useDispatch } from 'react-redux';
import { withNavigationFocus } from "react-navigation";

const SkillsExpand = (props) => {
  const [expanded, setExpand] = useState(true);
  const [acceptingHelp, setAcceptingHelp] = useState(props.isAcceptingHelp);

  const dispatch = useDispatch();
  const skills = props.skills;

  const toggleExpand = () =>{
    setExpand(!expanded)
  };

  const toggleAcceptingHelpSwitch = async () =>{
    //TODO: api request to change the switch state.
    try {
     await dispatch(editProfileData(
        props.userData.id,
        {accepting_help_requests: !props.isAcceptingHelp,
          profile_image:props.userData.profile_image}
      ));
      setAcceptingHelp(!acceptingHelp);
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Failed to change accepting help status');
      this.setState({
        loading: false,
        error: 'Failed to change accepting help status'
      });
    }
  };

    return (
      <View style={styles.itemContainers}>
        <TouchableOpacity style={styles.itemTitleRow} onPress={toggleExpand}>
          <Sync/>
          <Text style={styles.itemTitleText}>
            Our Skills
          </Text>
          <View style={styles.chevronArrowContainer}>
            {expanded ? <ChevronBottom/>:<ChevronRight/>}
          </View>
        </TouchableOpacity>
        {expanded ? (
          <View style={styles.itemContentBody}>
              <View style={styles.itemContentRows}>
                {skills.map((skill, i) => {
                  if(skill) {
                    return (
                      <TouchableOpacity key={i} style={styles.skillsButton}>
                        <Text style={styles.mediumButtonText}>
                          {skill}
                        </Text>
                      </TouchableOpacity>
                    )
                  }
                })}
                <TouchableOpacity style={styles.responsiveButton}>
                  <Text style={styles.buttonTextPlusIcon}>
                    +
                  </Text>
                  <Text style={styles.mediumButtonText}>
                    ADD A SKILL
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.itemFooterRow}>
                <Text style={styles.reachMeText}>Other Conservation organizations and Researchers can contact me about our skills</Text>
                <Switch
                  style={styles.reachMeSwitch}
                  trackColor={{ false: "#767577", true: "#30d985" }}
                  thumbColor={acceptingHelp ? "#fffeff" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleAcceptingHelpSwitch}
                  value={acceptingHelp}
                />
              </View>
            </View>
        ) : null}
      </View>
    );

}

const mapStateToProps = (state) => ({
  currentUserProfile: state.currentUserProfile,
});
export default connect(mapStateToProps, {
  editProfileData
})(SkillsExpand);