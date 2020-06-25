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
import { Badge } from 'react-native-elements';

import ConnectionNotification from '../../components/Notifications/ConnectionNotification';
import CampaignNotification from '../../components/Notifications/CampaignNotification';

import Messages from '../../assets/jsicons/bottomnavigation/Messages';
import Bell from '../../assets/jsicons/bottomnavigation/BellB';
import Logo from '../../assets/jsicons/other/Logo';

import { connect } from 'react-redux';
import { getAllNotifications, markNotification } from '../../store/actions';
import { NavigationEvents } from 'react-navigation';

class NotificationsMain extends React.Component {
  constructor(props) {
    super(props);
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
    if (this.props.notificationsLoading)
      this.props.getAllNotifications(this.props.currentUserId);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <NavigationEvents
          onDidFocus={() =>
            this.props.getAllNotifications(this.props.currentUserId)
          }
        />
        <View style={styles.tabContainer} elevation={8}>
          <TouchableOpacity
            style={
              !this.state.isActive ? styles.tabButtonSelected : styles.tabButton
            }
            onPress={() => {
              this.setState({
                isActive: !this.state.isActive,
                notifOpen: !this.state.notifOpen,
              });
            }}
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
              <Badge
                value={
                  <Text style={styles.badgeText}>
                    {
                      this.props.notifications.filter(
                        (notif) => notif.new_notification
                      ).length
                    }
                  </Text>
                }
                badgeStyle={styles.badge}
                containerStyle={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={
            this.props.notificationsLoading
              ? styles.contentContainerLoading
              : styles.contentContainer
          }
          style={!this.state.notifOpen ? '' : styles.closed}
        >
          <View
            style={
              this.props.notificationsLoading
                ? styles.loadingContainer
                : styles.closed
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
            this.props.notificationsLoading
              ? styles.contentContainerLoading
              : styles.contentContainer
          }
          style={this.state.notifOpen ? '' : styles.closed}
        >
          {/* FlatMap goes here */}
          {/* <FlatList /> */}

          <View
            style={
              this.props.notificationsLoading
                ? styles.loadingContainer
                : styles.closed
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
            data={this.props.notifications}
            showsVerticalScrollIndicator={false}
            renderItem={(data) => {
              switch (data.item.notification_type) {
                case 0:
                  return (
                    <ConnectionNotification
                      notifData={data}
                      nav={this.state.navigation}
                    />
                  );

                case 1:
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
    maxHeight: '8%',
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
  badge: {
    backgroundColor: '#D7FE49',
    color: 'black',
    overflow: 'hidden',
    position: 'relative',
  },
  badgeText: {
    color: 'black',
  },
  counterText: {
    position: 'absolute',
    right: 1,
    top: -1,
    fontSize: 11,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '90%',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    paddingTop: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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

const mapStateToProps = (state) => ({
  currentUserId: state.currentUserProfile.id,
  notifications: state.notifications,
  notificationsLoading: state.notificationsLoading,
});

export default connect(mapStateToProps, {
  getAllNotifications,
  markNotification,
})(NotificationsMain);
