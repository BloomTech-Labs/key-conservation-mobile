import React, { Component } from 'react';
import { Text, Keyboard, View } from 'react-native';

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
        <DoneButton
          navigation={navigation}
          pressAction={navigation.getParam('done')}
        />
      ),
    };
  };

  state = {
    submitting: false,
  };

  submit = async (state) => {
    Keyboard.dismiss();
    this.setState({ submitting: true });
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
        await this.props.editProfileData(changes);
      }
      return true;
    } catch (err) {
      console.log(err);
      this.setState({ submitting: false });
      return false;
    }
  };

  render() {
    const form = this.props.profile ? (
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

    return (
      <View pointerEvents={this.state.submitting ? 'none' : 'auto'}>
        {form}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.currentUserProfile,
});

export default connect(mapStateToProps, { editProfileData })(EditProfileScreen);
