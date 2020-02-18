import React from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Viewport } from '@skele/components';
import { getProfileData, createReport } from '../store/actions';
import FeedCampaign from '../components/FeedScreen/FeedCampaign';
import FeedUpdate from '../components/FeedScreen/FeedUpdate';
import ProfileHeader from '../components/Profile/ProfileHeader';
import BackButton from '../components/BackButton';
import CampBlankSpace from '../components/Profile/CampBlankSpace';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ellipse from '../assets/jsicons/Ellipse';
import UserActionSheet from '../components/Reports/UserActionSheet';
import style from '../constants/Profile/CampBlankSpace';
import SettingsButton from '../components/SettingsButton';
import EditButton from '../components/EditButton';

class ProScreen extends React.Component {
  constructor(props) {
    super(props);
    const id =
      this.props.navigation.getParam('selectedProfile') ||
      this.props.currentUserProfile.id;
    this.props.getProfileData(id, null, !this.props.navigation.getParam('selectedProfile'));
    this.props.navigation.setParams({
      showProScreenActions: this.showActionSheet,
      currentProfile: this.props.currentUserProfile
    });
  }
  static navigationOptions = ({ navigation }) => {
    const fromMap = navigation.getParam('fromMap', 'defaultValue');

    const selectedProfile = navigation.getParam('selectedProfile');
    const currentProfile = navigation.getParam('currentProfile');

    const headerRight = () => {
      if (!selectedProfile) {
        return <EditButton navigation={navigation} editRoute={'EditPro'} />;
      } else if (selectedProfile && currentProfile?.id === selectedProfile)
        return <EditButton navigation={navigation} editRoute={'EditPro'} />;
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
        return <BackButton navigation={navigation} fromMap={fromMap} />;
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
      ? this.props.selectedProfile
      : this.props.currentUserProfile;

    return (
      // creates sticky header
      <Viewport.Tracker>
        <ScrollView
          contentContainerStyle={{ flex: this.props.loading ? 1 : 0 }}
          stickyHeaderIndices={[0]}
          scrollEventThrottle={16}
        >
          <UserActionSheet
            admin={this.props.admin}
            userId={profileData.id}
            ref={o => (this.UserActionSheet = o)}
          />
          <ProfileHeader
            loading={this.props.loading}
            navigation={navigation}
            profile={profileData}
            myProfile={profileData === this.props.currentUserProfile}
          />
          {this.props.loading ? (
            <ActivityIndicator
              style={{ margin: 'auto', flex: 1 }}
              size='large'
            />
          ) : (
            <View style={{ height: '100%', borderWidth: 1 }}>
              {!profileData.campaigns?.length ? (
                <View style={style.container}>
                  <CampBlankSpace />
                  <Text style={style.text}>
                    {profileData.id === this.props.currentUserProfile.id
                      ? "You don't have any posts! Go to the live feed to create your first campaign."
                      : `This organization has not created a campaign yet.`}
                  </Text>
                </View>
              ) : null}
              {profileData.campaigns?.map(camp => {
                if (camp.update_id) {
                  return (
                    <FeedUpdate
                      key={`update${camp.update_id}`}
                      data={camp}
                      toggled
                      navigation={navigation}
                    />
                  );
                } else {
                  return (
                    <FeedCampaign
                      key={camp.camp_id}
                      data={camp}
                      toggled
                      navigation={navigation}
                    />
                  );
                }
              })}
            </View>
          )}
        </ScrollView>
      </Viewport.Tracker>
    );
  }
}

const mapStateToProps = state => ({
  selectedProfile: state.selectedProfile,
  currentUserProfile: state.currentUserProfile,
  admin: state.currentUserProfile.admin,
  loading: state.pending.getProfile
});

export default connect(mapStateToProps, { getProfileData, createReport })(
  ProScreen
);
