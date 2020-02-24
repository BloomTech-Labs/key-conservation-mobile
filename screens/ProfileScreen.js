import React from 'react';
import { ScrollView, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Viewport } from '@skele/components';
import { getProfileData, createReport } from '../store/actions';
import ProfileHeader from '../components/Profile/ProfileHeader';
import BackButton from '../components/BackButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ellipse from '../assets/jsicons/Ellipse';
import UserActionSheet from '../components/Reports/UserActionSheet';
import SettingsButton from '../components/SettingsButton';
import EditButton from '../components/EditButton';
import ProfileBody from '../components/Profile/ProfileBody';
import { withNavigationFocus } from 'react-navigation';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      loading: true,
      user: {}
    };
    this.profileId =
      this.props.navigation.getParam('selectedProfile') ||
      this.props.currentUserProfile.id;
    this.props.navigation.setParams({
      showProScreenActions: this.showActionSheet,
      currentProfile: this.props.currentUserProfile
    });
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

  componentDidMount = () => {
    this.initProfileData();

    this._sub = this.props.navigation.addListener(
      'didFocus',
      this.initProfileData
    );
  };

  componentWillUnmount() {
    this._sub.remove();
  }

  static navigationOptions = ({ navigation }) => {
    const selectedProfile = navigation.getParam('selectedProfile');
    const currentProfile = navigation.getParam('currentProfile');

    const editRoute =
      selectedProfile?.roles || currentProfile?.roles === 'supporter'
        ? 'EditSupPro'
        : 'EditPro';

    const headerRight = () => {
      if (!selectedProfile) {
        return <EditButton navigation={navigation} editRoute={editRoute} />;
      } else if (selectedProfile && currentProfile?.id === selectedProfile)
        return <EditButton navigation={navigation} editRoute={editRoute} />;
      else {
        return (
          <TouchableOpacity
            style={{
              transform: [{ rotate: '90deg' }],
              padding: 16,
              paddingRight: 24
            }}
            onPress={navigation.getParam('showProScreenActions')}
          >
            <Ellipse width='25' height='25' />
          </TouchableOpacity>
        );
      }
    };

    const headerLeft = () => {
      if (selectedProfile) {
        return <BackButton navigation={navigation} />;
      } else {
        return (
          <SettingsButton
            navigation={navigation}
            settingsRoute={'AccountSettings'}
          />
        );
      }
    };

    return {
      headerTransparent: true,
      title: '',
      headerTintColor: '#fff',
      headerLeft,
      headerRight
    };
  };

  showActionSheet = () => {
    this.UserActionSheet?.show();
  };

  componentWillUnmount() {
    this.props.navigation.setParams({ selectedProfile: null });
  }

  render() {
    const { navigation } = this.props;

    const profileData = this.props.navigation.getParam('selectedProfile')
      ? this.state.user
      : this.props.currentUserProfile;

    return (
      // creates sticky header
      <Viewport.Tracker>
        <ScrollView
          contentContainerStyle={{ flex: this.state.loading ? 1 : 0 }}
          stickyHeaderIndices={[0]}
          scrollEventThrottle={16}
        >
          <UserActionSheet
            admin={this.props.admin}
            userId={profileData.id}
            ref={o => (this.UserActionSheet = o)}
          />
          <ProfileHeader
            loading={this.state.loading}
            navigation={navigation}
            profile={profileData}
            profileId={this.profileId}
            myProfile={profileData === this.props.currentUserProfile}
          />
          {this.state.loading ? (
            <ActivityIndicator
              style={{ margin: 'auto', flex: 1 }}
              size='large'
            />
          ) : (
            <ProfileBody profile={profileData} />
          )}
        </ScrollView>
      </Viewport.Tracker>
    );
  }
}

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
  admin: state.currentUserProfile.admin
});

export default connect(mapStateToProps, { getProfileData, createReport })(
  withNavigationFocus(ProfileScreen)
);
