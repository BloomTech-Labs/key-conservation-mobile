import React from 'react';
import { ActivityIndicator, Alert, Animated, ScrollView, View } from 'react-native';
import styles from '../../constants/SkilledImpact/OrgSkilledImpactScreen';
import OrgSkilledImpactHeader from '../../components/SkilledImpact/OrgSkilledImpactHeader';
import OrgSkilledImpactBody from '../../components/SkilledImpact/OrgSkilledImpactBody';
import { connect } from 'react-redux';
import { getProfileData } from '../../store/actions';
import { withNavigationFocus } from 'react-navigation';

class OrgSkillImpactScreen extends React.Component {
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


  componentDidMount = () => {
    this.initProfileData();
    this.focusListener = this.props.navigation.addListener(
      'didFocus',
      this.initProfileData
    );
  };

  componentWillUnmount() {
    this.focusListener.remove();
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
    const userData = this.props.navigation.getParam('selectedProfile')
      ? this.state.user
      : this.props.currentUserProfile;

    if(!userData||Object.keys(userData).length !== 0) {
      return (
        <ScrollView style={styles.container}>
          <OrgSkilledImpactHeader/>
          {!this.state.loading ? (
          <OrgSkilledImpactBody
            skills={this.skills}
            userData={this.state.user}
          />
            ):(
              <ActivityIndicator
            style={{ margin: 'auto', flex: 1 }}
            size='large'
            />)}
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

export default connect(mapStateToProps, { getProfileData })(
  withNavigationFocus(OrgSkillImpactScreen)
);
