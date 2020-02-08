import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-navigation';
import { connect } from 'react-redux';
import { getProfileData } from '../store/actions';
import EditButton from '../components/EditButton';
import SettingsButton from '../components/SettingsButton';
import SupProfileHeader from '../components/Profile/SupProfileHeader';
import SupProfileBody from '../components/Profile/SupProfileBody';

class MySupProScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: true,
      title: '',
      headerLeft: () => (
        <SettingsButton
          navigation={navigation}
          settingsRoute={'AccountSettings'}
        />
      ),
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        marginTop: 10,
        alignSelf: 'center',
        fontFamily: 'Lato-Bold'
      },
      headerRight: () => (
        <EditButton navigation={navigation} editRoute={'EditSupPro'} />
      )
    };
  };

  componentDidMount() {
    this.props.getProfileData(
      this.props.currentUserProfile.id,
      false,
      'myProfile'
    );
  }

  render() {
    return (
      <ScrollView>
        <View>
          <SupProfileHeader profile={this.props.currentUserProfile} />
          <SupProfileBody profile={this.props.currentUserProfile} />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile
});
const optionsStyles = {
  optionsContainer: {
    width: 75
  }
};

export default connect(mapStateToProps, { getProfileData })(MySupProScreen);
