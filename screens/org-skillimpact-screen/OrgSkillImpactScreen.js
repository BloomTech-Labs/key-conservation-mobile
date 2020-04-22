import React, { Component } from 'react';
import { View } from 'react-native';
import styles from '../../constants/SkilledImpact/OrgSkilledImpactScreen';
import OrgSkilledImpactHeader from '../../components/SkilledImpact/OrgSkilledImpactHeader';
import OrgSkilledImpactBody from '../../components/SkilledImpact/OrgSkilledImpactBody';

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
      <View style={styles.container}>
        <OrgSkilledImpactHeader/>
        <OrgSkilledImpactBody/>
      </View>
    );
  }
}


export default OrgSkillImpactScreen;