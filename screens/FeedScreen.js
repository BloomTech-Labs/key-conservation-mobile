import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ScrollView } from 'react-navigation';
import { connect } from 'react-redux';
import * as SecureStorage from 'expo-secure-store';
import { Icon } from 'react-native-elements';

import { getCampaigns } from '../store/actions';

import Campaign from '../components/FeedScreen/Campaign';
import LoginButton from '../components/LoginButton';

import styles from '../constants/Stylesheet';

class FeedScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Feed',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center',
        fontFamily: 'OpenSans-SemiBold'
      },
      headerLeft: <View />,
      headerRight: <View />
      // headerRight: <LoginButton roles={navigation.getParam('roles')} navigation={navigation} loginRoute={'Login'} />
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      roles: this.props.currentUserProfile.roles
    });
    this.props.getCampaigns();
    let refreshInterval = setInterval(() => this.props.getCampaigns(), 10000);
  }

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
        <View style={styles.feedContainer}>
          {this.props.allCampaigns.length > 0 &&
            this.props.allCampaigns.map(campaign => {
              return (
                <Campaign
                  key={campaign.camp_id}
                  data={campaign}
                  navigation={navigation}
                />
              );
            })}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  allCampaigns: state.allCampaigns,
  currentUserProfile: state.currentUserProfile
});

export default connect(
  mapStateToProps,
  { getCampaigns }
)(FeedScreen);
