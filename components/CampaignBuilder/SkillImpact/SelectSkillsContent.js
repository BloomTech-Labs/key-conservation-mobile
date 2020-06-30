import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from '../../../constants/CampaignBuilder/SkillImpact/SkillExpand';
import { editProfileData } from '../../../store/actions';
import { connect } from 'react-redux';
import SkillSelect from '../../SkillSelect';

const SelectSkillsContent = (props) => {
  const onChangeSkillImpactRequest = (skills) => {
    if (skills.length > Array.from(props.skillImpactRequests.keys()).length) {
      skills.map((skill) => {
        if (!props.skillImpactRequests.has(skill)) {
          const skillImpactRequestJSON = {
            skill,
            point_of_contact: '',
            welcome_message: '',
            our_contribution: '',
            project_goals: [
              {
                goal_title: '',
                description: '',
              },
            ],
          };
          props.skillImpactRequests.set(skill, skillImpactRequestJSON);
        }
      });
    } else {
      Array.from(props.skillImpactRequests.keys()).map((skill) => {
        if (!skills.includes(skill)) {
          props.skillImpactRequests.delete(skill);
        }
      });
    }
    props.onChangeSkills(props.skillImpactRequests);
  };

  return (
    <View style={styles.itemContentBody}>
      <View style={styles.itemFooterRow}>
        <Text style={styles.itemBodyText}>
          Fill out information for each skill that you need help with below.
          Each skill will have a separate entry so complete one at a time. Be as
          detailed as possible with your requests so the supporter with the
          ideal skill applies and knows exactly what you hope to achieve.
        </Text>
      </View>
      <View style={styles.itemContentRows}>
        <SkillSelect
          skills={Array.from(props.skillImpactRequests.keys())}
          enableOtherSkills={false}
          onSkillsChanged={(skills) => onChangeSkillImpactRequest(skills)}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  currentUserProfile: state.currentUserProfile,
});
export default connect(mapStateToProps, {
  editProfileData,
})(SelectSkillsContent);
