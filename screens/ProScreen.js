import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView
} from 'react-native';
// import { ScrollView } from "react-navigation";
import { connect } from 'react-redux';

import { getProfileData } from '../store/actions';

import { Avatar, Icon, ListItem } from 'react-native-elements';

import FeedCampaign from '../components/FeedScreen/FeedCampaign';
import ProfileHeader from '../components/Profile/ProfileHeader';

import BackButton from '../components/BackButton';


class ProScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profile',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center',
        fontFamily: 'OpenSans-SemiBold',
      },
      headerLeft: <BackButton navigation={navigation} />,
      headerRight: <View />
    };
  };
  
  render() {
    return (
      <ScrollView stickyHeaderIndices={[0]}>
        <View style={{borderBottomWidth: 2, borderBottomColor: '#929292'}}>
          <ProfileHeader navigation={this.props.navigation} profile={this.props.selectedProfile} myProfile={false} />
        </View>
        {this.props.selectedProfile.campaigns.map(camp => {
          return (
            <FeedCampaign
              key={camp.camp_id}
              data={camp}
              toggled={true}
              navigation={this.props.navigation}
            />
          );
        })}
      </ScrollView>
      
      
    );
  }
};

const mapStateToProps = state => ({
  selectedProfile: state.selectedProfile
});

export default connect(
  mapStateToProps,
  { getProfileData }
)(ProScreen);

