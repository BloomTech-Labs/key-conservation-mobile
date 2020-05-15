import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';

class SkillGroupElement extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Avatar size={95} rounded source={this.props.image} />
        <Text style={styles.skillGroupTitle}>Skilled Impact:</Text>
        <Text style={styles.skillGroupName}>{this.props.name}</Text>
      </View>
    );
  }
}
export default SkillGroupElement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skillGroupTitle: {
    fontSize: 16,
    marginTop: 10,
  },
  skillGroupName: {
    fontSize: 16,
  },
});
