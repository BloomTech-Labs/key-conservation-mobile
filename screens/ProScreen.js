import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView
} from 'react-native';
<<<<<<< HEAD
=======
import { ScrollView } from "react-navigation";
import { connect } from 'react-redux';

import { getProfileData } from '../store/actions';
>>>>>>> parent of efea1c3... Revert "Merge branch 'single-campaign' into development"

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
<<<<<<< HEAD
      // creates sticky header
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
      
      
=======
      <ScrollView>
        <ProfileHeader navigation={this.props.navigation} profile={this.props.selectedProfile} myProfile={false} />
        <View />
        <View>
          {this.props.selectedProfile.campaigns.map(campaign => {
            return (
              <ListItem
                key={campaign.camp_id}
                title={campaign.camp_name}
                leftAvatar={{ source: { uri: campaign.camp_img } }}
                subtitle={campaign.location}
                // rightIcon={
                //   <Icon name='ellipsis-v' type='font-awesome' color='black' />
                // }
              />
            );
          })}
        </View>
      </ScrollView>
>>>>>>> parent of efea1c3... Revert "Merge branch 'single-campaign' into development"
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

