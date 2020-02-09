import React from 'react';
import { View, ScrollView } from 'react-native';
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

class ProScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const fromMap = navigation.getParam('fromMap', 'defaultValue');

    return {
      title: 'Profile',
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
            paddingRight: 24,
          }}
        >
          <Ellipse width='25' height='25' />
        </TouchableOpacity>
      )
    };
  };

  render() {
    const { navigation } = this.props;
    return (
      // creates sticky header
      <Viewport.Tracker>
        <ScrollView stickyHeaderIndices={[0]} scrollEventThrottle={16}>
          <ProfileHeader
            navigation={navigation}
            profile={this.props.selectedProfile}
            myProfile={false}
          />
          {this.props.selectedProfile.campaigns.length === 0 ? (
            <CampBlankSpace profile={this.props.selectedProfile} />
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
  selectedProfile: state.selectedProfile
});

export default connect(mapStateToProps, { getProfileData, createReport })(
  ProScreen
);
