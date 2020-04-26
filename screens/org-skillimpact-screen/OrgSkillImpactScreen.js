import React, { Component } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import styles from '../../constants/SkilledImpact/OrgSkilledImpactScreen';
import OrgSkilledImpactHeader from '../../components/SkilledImpact/OrgSkilledImpactHeader';
import OrgSkilledImpactBody from '../../components/SkilledImpact/OrgSkilledImpactBody';
import { connect } from 'react-redux';
import { createReport, getProfileData } from '../../store/actions';
import { withNavigationFocus } from "react-navigation";

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
    this.profileId =
      this.props.navigation.getParam('selectedProfile') ||
      this.props.currentUserProfile.id;
    this.skills =  this.props.navigation.getParam('selectedProfile') ||
      this.props.currentUserProfile.skills;
  }


  componentWillMount(){

  }

  componentDidMount = () => {
    //TODO when the screen is loaded
    this.initProfileData();
    this._sub = this.props.navigation.addListener(
      'didFocus',
      this.initProfileData
    );
  };

  componentWillUnmount() {
    this._sub.remove();
  }

  initProfileData = async () => {
    try {
      const user = await this.props.getProfileData(
        this.profileId,
        null,
        !this.props.navigation.getParam('selectedProfile')
      );
      this.setState({
        user,
        loading: false
      });
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Failed to retrieve user profile');
      this.setState({
        loading: false,
        error: 'Failed to retrieve user profile'
      });
    }
  };

  render() {
    //TODO view to be implemented
    const userData = this.state.user;
    if(Object.keys(userData).length !== 0) {
      return (
        <ScrollView style={styles.container}>
          <OrgSkilledImpactHeader/>
          <OrgSkilledImpactBody
            skills={this.skills}
            userData={this.state.user}
          />
        </ScrollView>
      );
    }else{
      return null;
    }
  }
}

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
});

export default connect(mapStateToProps, { getProfileData })(OrgSkillImpactScreen);
