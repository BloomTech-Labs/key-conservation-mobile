import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import styles from '../../../constants/SkilledImpact/SupporterSkilledImpactBody';

class SkillGroupElement extends Component {
  render() {
    return (
      <View style={styles.skillGroupElement}>
        <Avatar size={95} rounded source={this.props.image} />
        <Text style={styles.skillGroupTitle}>Skilled Impact:</Text>
        <Text style={styles.skillGroupName}>{this.props.name}</Text>
      </View>
    );
  }
}
export default SkillGroupElement;
