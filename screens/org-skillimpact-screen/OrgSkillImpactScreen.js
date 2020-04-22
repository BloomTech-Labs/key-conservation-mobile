import React, { Component } from 'react';
import { View } from 'react-native';
import OrgSkilledImpactHeader from '../../components/SkilledImpact/OrgSkilledImpactHeader';
import ProfileHeader from '../../components/Profile/ProfileHeader';

class OrgSkillImpactScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    //TODO use navigations to establish stack navigation logic
    return {
      title: 'OUR SKILLED IMPACT',
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
    this.state = {
      error: '',
      loading: true,
      user: {},
      scrollY: 0
    };
  }

  componentDidMount() {
    //TODO when the screen is loaded
  }


  render() {
    //TODO view to be implemented
    return (
      <View>
        <OrgSkilledImpactHeader/>
      </View>
    );

  }
}


export default OrgSkillImpactScreen;