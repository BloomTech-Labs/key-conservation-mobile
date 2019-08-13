import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';
import { ScrollView } from "react-navigation";
import { connect } from 'react-redux';

import { getProfileData } from '../store/actions';

import { Avatar, Icon, ListItem } from 'react-native-elements';

import ProfileHeader from '../components/Profile/ProfileHeader';


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
      headerLeft: <View />,
      headerRight: <View />
    };
  };
  
  render() {
    const orgId = this.props.navigation.getParam('orgId');
    return (
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

