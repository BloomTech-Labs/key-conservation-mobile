import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-navigation';
import * as SecureStore from 'expo-secure-store';
import {
  getCampaignsBySkill,
  getProfileData,
  getApplicationsByUser,
  getCampaigns,
} from '../../store/actions';
import { connect } from 'react-redux';
import SupporterSkilledImpactHeader from '../../components/SkilledImpact/SupporterSkilledImpactHeader';
import SupporterSkilledImpactBody from '../../components/SkilledImpact/SupporterSkilledImpactBody';

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
      data: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.initProfileData();
  }

  initProfileData = async () => {
    try {
      const userId = await SecureStore.getItemAsync('id', {});
      await this.props.getProfileData(userId, null, true);
      const { skills } = this.currentUserProfile;
      await this.props.getCampaignsBySkill(skills);
      await this.props.getApplicationsByUser(userId);

      const data = {
        campaigns: this.props.allCampaigns,
        submissions: this.props.submissions,
        skills,
      };

      this.setState({
        data,
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
    const data = this.state.data;
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  allCampaigns: state.allCampaigns,
  submissions: state.submissions,
  currentUserProfile: state.currentUserProfile,
});

export default connect(mapStateToProps, {
  getProfileData,
  getCampaignsBySkill,
  getCampaigns,
  getApplicationsByUser,
})(SupporterSkillImpactScreen);
