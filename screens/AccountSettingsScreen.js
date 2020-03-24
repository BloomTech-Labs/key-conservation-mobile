import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-navigation';
import { connect } from 'react-redux';
import * as SecureStorage from 'expo-secure-store';
// import * as WebBrowser from 'expo-web-browser';
// import Constants from 'expo-constants';

import { logout } from '../store/actions';
import BackButtonHeader from '../components/BackButtonHeader';
import LogoutSymbol from '../assets/jsicons/KeyCon/LogoutSymbol';
import styles from '../constants/screens/AccountSettingsScreen';
import Smile from '../assets/jsicons/bottomnavigation/Smile';

class AccountSettingsScreen extends React.Component {
  state = {
    result: null,
    roles: ''
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'ACCOUNT SETTINGS',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerLeft: () => (
        <BackButtonHeader pressAction={navigation.getParam('done')} />
      )
    };
  };
  getRole = async () => {
    const myRoles = await SecureStorage.getItemAsync('roles', {});
    this.setState({ roles: myRoles });
  };

  componentDidMount() {
    this.props.navigation.setParams({ done: this.done });
    this.getRole();
  }

  done = () => {
    if (this.state.roles === 'conservationist') {
      this.props.navigation.navigate('MyProfile');
    } else {
      this.props.navigation.navigate('MySupporterProfile');
    }
  };
  viewReports = () => {
    this.props.navigation.navigate('AdminScreen');
  };
  logoutPress = async () => {
    await SecureStorage.deleteItemAsync('sub', {});
    await SecureStorage.deleteItemAsync('email', {});
    await SecureStorage.deleteItemAsync('roles', {});
    await SecureStorage.deleteItemAsync('id', {});
    await SecureStorage.deleteItemAsync('userId', {});
    await SecureStorage.deleteItemAsync('accessToken', {});
    // await SecureStorage.deleteItemAsync("airtableKey", {}); // for development
    this.props.logout();

  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollBG}>
        {this.props.currentUserProfile.admin && (
          <View style={styles.sections}>
            <View style={styles.iconWrap}>
              <Smile />
              <Text style={styles.title}>Admin Controls</Text>
            </View>
            <TouchableOpacity
              style={styles.linkWrap}
              onPress={this.viewReports}
            >
              <View style={styles.logoutButton}>
                <LogoutSymbol />
              </View>
              <Text style={styles.linkText}>Manage Reports</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.sections}>
          <View style={styles.iconWrap}>
            <Smile />
            <Text style={styles.title}>Log Out Of Your Profile</Text>
          </View>
          <TouchableOpacity style={styles.linkWrap} onPress={this.logoutPress}>
            <View style={styles.logoutButton}>
              <LogoutSymbol />
            </View>
            <Text style={styles.linkText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile
});

export default connect(mapStateToProps, { logout })(AccountSettingsScreen);
