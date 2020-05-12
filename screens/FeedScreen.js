import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { ScrollView } from 'react-navigation';
import { connect } from 'react-redux';
import { getFeed, queueNewPosts, refreshFeed } from '../store/actions';
import CampaignPost from '../components/CampaignPost';
import styles from '../constants/screens/FeedScreen';
import { Viewport } from '@skele/components';
import AddCampaignHeader from '../components/FeedScreen/AddCampaignHeader';
import FeedLoading from '../components/FeedScreen/FeedLoading';

import Search from '../assets/jsicons/SearchIcon';
import WebSocketManager from '../websockets/WebSocketManager';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 48;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

class FeedScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'LIVE Feed',
      headerStyle: {
        backgroundColor: '#323338',
      },
      headerTintColor: '#fff',
      headerLeft: () => <View />,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          style={{
            width: 70,
            height: 45,
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginRight: 15,
          }}
        >
          <Search />
        </TouchableOpacity>
      ),
    };
  };

  state = {
    gettingMorePosts: false,
    refreshing: false,
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.props
      .refreshFeed(this.props.allCampaigns[0].created_at)
      .finally(() => {
        this.setState({ refreshing: false });
      });
    if (!WebSocketManager().getInstance().connected) {
      WebSocketManager().getInstance().reconnect();
    }
  };

  onScrollToBottom = ({ nativeEvent }) => {
    if (isCloseToBottom(nativeEvent) && !this.state.gettingMorePosts) {
      this.setState({ gettingMorePosts: true });
      this.props.getFeed(this.props.allCampaigns.length).finally(() => {
        this.setState({ gettingMorePosts: false });
      });
    }
  };

  componentDidMount() {
    this.props.getFeed();
    this.props.navigation.setParams({
      roles: this.props.currentUserProfile.roles,
    });

    WebSocketManager()
      .getInstance()
      .subscribe('feed', this.props.queueNewPosts);
  }

  componentDidUpdate() {
    if (!WebSocketManager().getInstance().connected) {
      WebSocketManager().getInstance().reconnect();
    }

    if (this.props.allCampaigns.length <= 3) {
      this.props.getFeed();
    }
  }

  componentWillUnmount() {
    WebSocketManager().getInstance().unsubscribe('feed');
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {this.props.feedError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{this.props.feedError}</Text>
            <Button title="Retry" onPress={this.props.getFeed} />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <Viewport.Tracker>
              <ScrollView
                scrollEventThrottle={16}
                stickyHeaderIndices={[1]}
                onScroll={this.onScrollToBottom}
              >
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
                <View>
                  {this.props.currentUserProfile.roles === 'conservationist' ? (
                    <AddCampaignHeader
                      profile={this.props.currentUserProfile}
                      disabled={this.props.loading}
                    />
                  ) : null}
                </View>
                <View style={styles.feedContainer}>
                  {this.props.allCampaigns.length > 0 &&
                    this.props.allCampaigns.map((campaign) => {
                      if (campaign) {
                        return (
                          <CampaignPost
                            key={campaign.id}
                            data={campaign}
                            toggled={this.props.campaignsToggled.includes(
                              campaign.id
                            )}
                            navigation={navigation}
                          />
                        );
                      }
                    })}
                </View>
                <View style={{ padding: 24 }}>
                  <ActivityIndicator
                    size="large"
                    style={{ opacity: this.state.gettingMorePosts }}
                  />
                </View>
              </ScrollView>
            </Viewport.Tracker>
            <FeedLoading loading={this.props.allCampaigns.length === 0} />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  allCampaigns: state.allCampaigns,
  currentUserProfile: state.currentUserProfile,
  campaignsToggled: state.campaignsToggled,
  loading: state.pending.getFeed,
  feedError: state.errors.getFeed,
});

export default connect(mapStateToProps, {
  getFeed,
  queueNewPosts,
  refreshFeed,
})(FeedScreen);
