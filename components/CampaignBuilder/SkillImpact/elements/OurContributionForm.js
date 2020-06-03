import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../../../../constants/CampaignBuilder/SkillImpact/SkillExpand';
import { connect } from 'react-redux';
import BallotCheck from '../../../../assets/jsicons/BallotCheck';

const OurContributionForm = (props) => {

  const onChangeOurContribution = (text) =>{
    props.onChangeContribution(text);
  };
  return (
    <View style={styles.itemContainers}>
      <View style={styles.itemContentBody}>
        <View style={styles.itemContentRows}>
          <View style={styles.itemContentIconContainer}>
            <BallotCheck />
          </View>
          <Text style={styles.itemContentTitle}>
            Our Contribution
          </Text>
        </View>
        <View style={styles.itemContentRows}>
          <Text style={styles.itemBodyText}>
            Describe what you have prepared for the supporter to work with. This
            can be anything from research, ideas to something else.
          </Text>
        </View>
        <View style={styles.itemContentRows}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.goalDescriptionBox}
            placeholder="Description of your contribution"
            onChangeText={text => onChangeOurContribution(text)}
            value={props.ourContribution}
          />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  currentUserProfile: state.currentUserProfile,
});
export default connect(mapStateToProps)
(OurContributionForm);
