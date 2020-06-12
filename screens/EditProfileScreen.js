import React, { Component } from 'react';
import { Text } from 'react-native';

import LocationIQ from 'react-native-locationiq';

import { editProfileData } from '../store/actions';
import { connect } from 'react-redux';
import SupporterForm from './EditProfileScreen/SupporterForm';
import OrganizationForm from './EditProfileScreen/OrganizationForm';
import DoneButton from '../components/DoneButton';

class EditProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Edit Profile',
      headerStyle: {
        backgroundColor: '#323338',
      },
      headerTintColor: '#fff',
      headerRight: () => (
        <DoneButton pressAction={navigation.getParam('done')} />
      ),
    };
  };

  submit = async (state) => {
    this.props.navigation.goBack();

    LocationIQ.init('pk.21494f179d6ad0c272404a3614275418');

    let changes = {};

    // Compare changes to current user profile
    // Only add things that have been changed to avoid
    // overlap
    Object.entries(state).forEach((entry) => {
      if (entry[1] !== this.props.profile?.[entry[0]]) {
        changes[entry[0]] = entry[1];
      }
    });

    try {
      if (changes.location) {
        const json = await LocationIQ.search(`${state.location}`);
        changes.latitude = parseFloat(json[0].lat);
        changes.longitude = parseFloat(json[0].lon);
      }
      if (changes !== {}) {
        this.props.editProfileData(changes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return this.props.profile ? (
      this.props.profile.roles === 'conservationist' ? (
        <OrganizationForm
          navigation={this.props.navigation}
          data={this.props.profile}
          onSubmit={this.submit}
        />
      ) : (
        <SupporterForm
          navigation={this.props.navigation}
          data={this.props.profile}
          onSubmit={this.submit}
        />
      )
    ) : (
      <Text>Loading...</Text>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.currentUserProfile,
});

export default connect(mapStateToProps, { editProfileData })(EditProfileScreen);
