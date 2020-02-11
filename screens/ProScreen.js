import React from 'react';
import { View, ScrollView, Text } from 'react-native';
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

class ProScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const fromMap = navigation.getParam('fromMap', 'defaultValue');

    return {
      title: '',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerLeft: () => (
        <BackButton navigation={navigation} fromMap={fromMap} />
      ),
      headerRight: () => (
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
      )
    };
  };

  showActionSheet = () => {
    this.UserActionSheet?.show();
  };

  componentDidMount() {
    this.props.navigation.setParams({
      showProScreenActions: this.showActionSheet
    });
  }

  render() {
    const { navigation } = this.props;
    return (
      // creates sticky header
      <Viewport.Tracker>
        <ScrollView stickyHeaderIndices={[0]} scrollEventThrottle={16}>
          <UserActionSheet
            admin={this.props.admin}
            userId={this.props.selectedProfile.id}
            ref={o => (this.UserActionSheet = o)}
          />
          <ProfileHeader
            navigation={navigation}
            profile={this.props.selectedProfile}
            myProfile={false}
          />
          {this.props.selectedProfile.campaigns.length === 0 ? (
            <View style={style.container}>
              <CampBlankSpace />
              <Text style={style.text}>
                This organization has not created a campaign yet.
              </Text>
            </View>
          ) : null}
          {this.props.selectedProfile.campaigns.map(camp => {
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
        </ScrollView>
      </Viewport.Tracker>
    );
  }
}

const mapStateToProps = state => ({
  selectedProfile: state.selectedProfile,
  admin: state.currentUserProfile.admin
});

export default connect(mapStateToProps, { getProfileData, createReport })(
  ProScreen
);
