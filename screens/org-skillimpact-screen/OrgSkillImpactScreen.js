import React, { Component } from 'react';
import { View } from 'react-native';

class OrgSkillImpactScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    //TODO use navigations to establish stack navigation logic
    return {
      title: 'Skill Impact',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerLeft: () => <View />,
    };
  };
  constructor(props) {
    //TODO props edits and states
    super(props);
  }

  componentDidMount() {
    //TODO when the screen is loaded
  }


  render() {
    //TODO view to be implemented
    return (
      <View>

      </View>
    );

  }
}


export default OrgSkillImpactScreen;