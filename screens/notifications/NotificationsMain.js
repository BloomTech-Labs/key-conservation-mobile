import React from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet, ActivityIndicator, Image, FlatList, Text } from 'react-native';

import BackButton from '../../components/BackButton';
import ConnectionNotification from '../../components/Notifications/ConnectionNotification'
import CampaignNotification from "../../components/Notifications/CampaignNotification";

import Messages from '../../assets/jsicons/bottomnavigation/Messages';
import Bell from '../../assets/jsicons/bottomnavigation/BellB';
import Logo from '../../assets/jsicons/other/Logo';

class NotificationsMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: false, isActive: true, notifOpen: true }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Notifications',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTitleAlign: 'center',
      headerTintColor: '#fff'
    };
  };

  componentDidMount() {

    console.log('Fetching notifications...');

  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={!this.state.isActive ? styles.tabButtonSelected : styles.tabButton} onPress={() => this.setState({ isActive: !this.state.isActive, notifOpen: !this.state.notifOpen })}>
            <Messages />
          </TouchableOpacity>
          <TouchableOpacity style={this.state.isActive ? styles.tabButtonSelected : styles.tabButton} onPress={() => this.setState({ isActive: !this.state.isActive, notifOpen: !this.state.notifOpen })}>
            <Bell />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={this.state.isLoading ? styles.contentContainerLoading : styles.contentContainer} style={!this.state.notifOpen ? '' : styles.closed}>

          <View style={this.state.isLoading ? styles.loadingContainer : styles.closed} >
            <Logo style={styles.logoIcon} />
            <ActivityIndicator style={styles.indicator} size='large' color="#00FF9A" />
          </View>

          {/* MESSAGES STUFF GOES HERE */}

        </ScrollView>
        <ScrollView contentContainerStyle={this.state.isLoading ? styles.contentContainerLoading : styles.contentContainer} style={this.state.notifOpen ? '' : styles.closed}>
          {/* FlatMap goes here */}
          {/* <FlatList /> */}

          <View style={this.state.isLoading ? styles.loadingContainer : styles.closed} >
            <Logo style={styles.logoIcon} />
            <ActivityIndicator style={styles.indicator} size='large' color="#00FF9A" />
          </View>
          <ConnectionNotification />
          <ConnectionNotification />
          <ConnectionNotification />

        </ScrollView>
      </View >
    );
  }
}

const styles = StyleSheet.create({

  wrapper: {

    flex: 1,
    width: '100%',
    height: '100%'

  },
  tabContainer: {

    flex: 1,
    flexDirection: 'row',
    width: '100%',
    maxHeight: '10%'

  },
  tabButton: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
    width: '50%',
    height: '100%'

  },
  tabButtonSelected: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '100%',
    marginLeft: 8,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#00FF9A'

  },
  tabIcon: {

    width: '15%',
    height: '15%'

  },
  contentContainer: {

    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '90%'

  },
  contentContainerLoading: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '90%'

  },
  loadingContainer: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  indicator: {

    width: 100,
    height: 100

  },
  closed: {

    display: 'none'

  }

});

export default NotificationsMain;
