import React from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  FlatList,
  Text,
} from 'react-native';

import BackButton from '../../components/BackButton';
import ConnectionNotification from '../../components/Notifications/ConnectionNotification';
import CampaignNotification from '../../components/Notifications/CampaignNotification';

import Messages from '../../assets/jsicons/bottomnavigation/Messages';
import Bell from '../../assets/jsicons/bottomnavigation/BellB';
import Logo from '../../assets/jsicons/other/Logo';

import { seedData } from '../../components/Notifications/seedData';

var aaa = 0;

class NotificationsMain extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      isLoading: false,
      isActive: true,
      notifOpen: true,
      navigation: props.navigation,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Notifications',
      headerStyle: {
        backgroundColor: '#323338',
      },
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
    };
  };

  componentDidMount() {
    // this.state.navigation.push('Connections', {});
    // console.log(this.state.navigation);
    console.log('Fetching notifications...');
    // console.log(seedData.data);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.tabContainer} elevation={8}>
          <TouchableOpacity
            style={
              !this.state.isActive ? styles.tabButtonSelected : styles.tabButton
            }
            onPress={() =>
              this.setState({
                isActive: !this.state.isActive,
                notifOpen: !this.state.notifOpen,
              })
            }
          >
            <Messages />
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.state.isActive ? styles.tabButtonSelected : styles.tabButton
            }
            onPress={() =>
              this.setState({
                isActive: !this.state.isActive,
                notifOpen: !this.state.notifOpen,
              })
            }
          >
            <View>
              <Bell />
              <View style={styles.counterTextContainer} />
              {/* </View> */}
              <Text style={styles.counterText}>
                {Object.keys(seedData.data).length}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={
            this.state.isLoading
              ? styles.contentContainerLoading
              : styles.contentContainer
          }
          style={!this.state.notifOpen ? '' : styles.closed}
        >
          <View
            style={
              this.state.isLoading ? styles.loadingContainer : styles.closed
            }
          >
            <Logo style={styles.logoIcon} />
            <ActivityIndicator
              style={styles.indicator}
              size="large"
              color="#00FF9A"
            />
          </View>

          {/* MESSAGES STUFF GOES HERE */}
        </ScrollView>
        <ScrollView
          contentContainerStyle={
            this.state.isLoading
              ? styles.contentContainerLoading
              : styles.contentContainer
          }
          style={this.state.notifOpen ? '' : styles.closed}
        >
          {/* FlatMap goes here */}
          {/* <FlatList /> */}

          <View
            style={
              this.state.isLoading ? styles.loadingContainer : styles.closed
            }
          >
            <Logo style={styles.logoIcon} />
            <ActivityIndicator
              style={styles.indicator}
              size="large"
              color="#00FF9A"
            />
          </View>

          <FlatList
            style={{ width: '100%', height: '100%' }}
            data={seedData.data}
            showsVerticalScrollIndicator={false}
            renderItem={(data) => {
              switch (data.item.notification_type) {
                case 1:
                  return (
                    <ConnectionNotification
                      notifData={data}
                      nav={this.state.navigation}
                    />
                  );

                case 2:
                  return (
                    <CampaignNotification
                      notifData={data}
                      nav={this.state.navigation}
                    />
                  );

                default:
                  return <Text>No new notifications</Text>;
              }
            }}
            keyExtractor={(data, index) => index.toString()}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#F2F2FB',
  },
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    maxHeight: '10%',
    backgroundColor: 'white',
    shadowColor: '#292626',
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
    width: '50%',
    height: '100%',
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
    borderBottomColor: '#00FF9A',
  },
  tabIcon: {
    width: '15%',
    height: '15%',
  },
  counterTextContainer: {
    position: 'absolute',
    right: -10,
    padding: 8,
    backgroundColor: '#D7FF43',
    borderRadius: 50,
  },
  counterText: {
    position: 'absolute',
    right: -5,
    top: -1,
    fontSize: 12,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // width: '100%',
    height: '90%',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    paddingTop: 5,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  contentContainerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '90%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 100,
    height: 100,
  },
  closed: {
    display: 'none',
  },
});

export default NotificationsMain;
