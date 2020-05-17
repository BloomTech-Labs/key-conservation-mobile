import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { ScrollView } from 'react-navigation';
import * as SecureStore from 'expo-secure-store';
import {
  getCampaignsBySkill,
  getProfileData,
  getApplicationsByUser,
} from '../../store/actions';
import { connect } from 'react-redux';
import SupporterSkilledImpactHeader from '../../components/SkilledImpact/SupporterSkilledImpactHeader';
import SupporterSkilledImpactBody from '../../components/SkilledImpact/SupporterSkilledImpactBody';
import styles from '../../constants/screens/SupporterSkilledImpactScreen';

class SupporterSkillImpactScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'My Skilled Impact',
      headerStyle: {
        backgroundColor: '#323338',
      },
      headerTintColor: '#fff',
      headerLeft: () => <View />,
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      campaigns: [],
      submissions: [],
      skills: [],
      userId: 0,
      isAcceptingHelp: false,
      loading: true,
    };
    this.initProfileData = this.initProfileData.bind(this);
  }

  componentDidMount() {
    this.initProfileData();
  }

  initProfileData = async () => {
    try {
      const userId = await SecureStore.getItemAsync('id', {});
      await this.props.getProfileData(userId, null, true);
      let { skills, accepting_help_requests } = this.props.currentUserProfile;
      // Placeholder for skills, remove once Skills Creation screen is made
      if (!skills) {
        skills = ['ARCHITECTURE', 'DRONE'];
      }
      skills.forEach(async (skill) => {
        await this.props.getCampaignsBySkill(skill);
        this.setState({
          campaigns: this.state.campaigns.concat(this.props.campaignsBySkill),
        });
      });

      await this.props.getApplicationsByUser(userId);

      this.setState({
        submissions: this.props.submissions,
        skills,
        isAcceptingHelp: accepting_help_requests,
        userId,
        loading: false,
      });
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Failed to retrieve user profile');
      this.setState({
        loading: false,
        error: 'Failed to retrieve user profile',
      });
    }
  };

  render() {
    const data = this.state;
    if (!this.state.loading && Object.keys(data).length !== 0) {
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <SupporterSkilledImpactHeader />
          <SupporterSkilledImpactBody data={data} />
        </ScrollView>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => ({
  campaignsBySkill: state.campaignsBySkill,
  submissions: state.submissions,
  currentUserProfile: state.currentUserProfile,
});

export default connect(mapStateToProps, {
  getProfileData,
  getCampaignsBySkill,
  getApplicationsByUser,
})(SupporterSkillImpactScreen);
