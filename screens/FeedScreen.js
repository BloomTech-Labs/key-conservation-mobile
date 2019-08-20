import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-navigation';
import { connect } from 'react-redux';
import * as SecureStorage from 'expo-secure-store';
import { Icon } from 'react-native-elements';
import { getCampaigns } from '../store/actions';
import Campaign from '../components/FeedScreen/Campaign';
import LoginButton from '../components/LoginButton';
import SvgUri from 'react-native-svg-uri';
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
        position: 'absolute',
        width: '100%',
        fontFamily: 'OpenSans-SemiBold'
      },
      headerLeft: <View />,
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          style={{ marginRight: 15 }}
        >
          <SvgUri
            width='25'
            height='25'
            source={require('../assets/icons/search-regular.svg')}
          />
        </TouchableOpacity>
      )
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
            this.props.allCampaigns.map(camp => {
              return (
                <FeedCampaign
                  key={camp.camp_id}
                  data={camp}
                  toggled={this.props.campaignsToggled.includes(camp.camp_id)}
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
  currentUserProfile: state.currentUserProfile,
  campaignsToggled: state.campaignsToggled
});

export default connect(
  mapStateToProps,
  { getCampaigns }
)(FeedScreen);
