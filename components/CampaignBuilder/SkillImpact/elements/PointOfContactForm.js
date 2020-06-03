import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import styles from '../../../../constants/CampaignBuilder/SkillImpact/SkillExpand';
import { connect } from 'react-redux';
import IdCardAlt from '../../../../assets/jsicons/IdCardAlt';

const PointOfContactForm = (props) => {

  const changePOC = (text) =>{
    props.skillImpactRequests.get(props.skill).point_of_contact=text;
    props.onChangeSkills(props.skillImpactRequests);
  };

  const changeWelcomeMessage = (text) =>{
    props.skillImpactRequests.get(props.skill).welcome_message=text;
    props.onChangeSkills(props.skillImpactRequests);
  };

  return (
      <View style={styles.itemContainers}>
        <View style={styles.itemContentBody}>
          <View style={styles.itemContentRows}>
            <View style={styles.itemContentIconContainer}>
              <IdCardAlt />
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Name of main point of contact"
              value={props.skillImpactRequests.get(props.skill).point_of_contact}
              onChangeText={text => changePOC(text)}
            />
          </View>
          <View style={styles.itemContentRows}>
            <TextInput
              multiline
              numberOfLines={4}
              style={styles.textBox}
              value={props.skillImpactRequests.get(props.skill).welcome_message}
              onChangeText={text => changeWelcomeMessage(text)}
              placeholder="Send a welcome message to the chosen applicant. This is the first thing they will read after being notified of being selected."
            />
          </View>
        </View>
    </View>
  );

}

const mapStateToProps = (state) => ({
  currentUserProfile: state.currentUserProfile,
});
export default connect(mapStateToProps)
(PointOfContactForm);
