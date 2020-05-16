import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-navigation';
import { connect } from 'react-redux';
import * as SecureStorage from 'expo-secure-store';

import { logout } from '../store/actions';
import BackButtonHeader from '../components/BackButtonHeader';
import LogoutSymbol from '../assets/jsicons/accountSettings/LogoutSymbol';
import styles from '../constants/screens/AccountSettingsScreen';

class AccountSettingsScreen extends React.Component {
  state = {
    result: null,
    roles: '',
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'ACCOUNT SETTINGS',
      headerStyle: {
        backgroundColor: '#323338',
      },
      headerTintColor: '#fff',
      headerLeft: () => (
        <BackButtonHeader pressAction={() => navigation.navigate('MyPro')} />
      ),
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
            <Text style={styles.title}>Admin Control Panel</Text>
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

const mapStateToProps = (state) => ({
  currentUserProfile: state.currentUserProfile,
});

export default connect(mapStateToProps, { logout })(AccountSettingsScreen);
