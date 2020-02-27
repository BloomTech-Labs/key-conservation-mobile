import React from 'react';
import {
  ScrollView,
  ActivityIndicator,
  Alert,
  View,
  Animated
} from 'react-native';
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
      user: {},
      scrollY: 0
    };
    this.profileId =
      this.props.navigation.getParam('selectedProfile') ||
      this.props.currentUserProfile.id;
    this.props.navigation.setParams({
      showProScreenActions: this.showActionSheet,
      currentProfile: this.props.currentUserProfile
    });

    this.headerOnScroll = React.createRef();
    this.bodyOnScroll = React.createRef();
    // this.scrollY = new Animated.Value(0);

    this.scrollView = React.createRef();

    this.scrollY = new Animated.Value(0);
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

  handleHeaderScale = (height, headerHeight) => {
    this.setState({ contentPaddingTop: height, headerHeight });
  };

  scrollToMaximizeContent = (animate = false) => {

    this.scrollView.current
      ?.getNode()
      .scrollTo({
        x: 0,
        y: this.state.contentPaddingTop - this.state.headerHeight,
        animate: animate
      });
  };

  render() {
    const { navigation } = this.props;

    // console.log(this.props);

    const profileData = this.props.navigation.getParam('selectedProfile')
      ? this.state.user
      : this.props.currentUserProfile;

    return (
      // creates sticky header
      <Viewport.Tracker>
        <View>
          <ProfileHeader
            parentScrollY={this.scrollY}
            loading={this.state.loading}
            navigation={navigation}
            profile={profileData}
            myProfile={profileData === this.props.currentUserProfile}
            onLayout={this.handleHeaderScale}
            ref={this.headerOnScroll}
          />
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              height: '100%'
            }}
            contentContainerStyle={{
              flex: this.state.loading ? 1 : 0,
              paddingTop: this.state.contentPaddingTop
            }}
            stickyHeaderIndices={[0]}
            scrollEventThrottle={12}
            ref={this.scrollView}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
              {
                useNativeDriver: true,
                listener: event => this.headerOnScroll.current?.(event)
              }
            )}
          >
            <UserActionSheet
              admin={this.props.admin}
              userId={profileData.id}
              ref={o => (this.UserActionSheet = o)}
            />
            {this.state.loading ? (
              <ActivityIndicator
                style={{ margin: 'auto', flex: 1 }}
                size='large'
              />
            ) : (
              <ProfileBody
                profile={profileData}
                contentPaddingTop={this.state.contentPaddingTop}
                headerHeight={this.state.headerHeight}
                scrollY={this.scrollY}
                ref={this.bodyOnScroll}
                scrollToMaximizeContent={this.scrollToMaximizeContent}
              />
            )}
          </Animated.ScrollView>
        </View>
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
