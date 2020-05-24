import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from 'react-native';
import { FlatList } from 'react-navigation';
import { connect } from 'react-redux';
import {
  getFeed,
  queueNewPosts,
  refreshFeed,
  dequeueNewPosts,
} from '../store/actions';
import CampaignPost from '../components/CampaignPost';
import styles from '../constants/screens/FeedScreen';
import { Viewport } from '@skele/components';
import AddCampaignHeader from '../components/FeedScreen/AddCampaignHeader';
import FeedLoading from '../components/FeedScreen/FeedLoading';

import Search from '../assets/jsicons/SearchIcon';
import WebSocketManager from '../websockets/WebSocketManager';
import NewPostsButton from '../components/FeedScreen/NewPostsButton';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 48;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const isCloseToTop = ({ contentOffset, contentSize }) => {
  const paddingToTop = 50;

  return (
    contentOffset.y < contentSize.height - (contentSize.height - paddingToTop)
  );
};

class FeedScreen extends React.Component {
  constructor(props) {
    super(props);

    this.scrollView = React.createRef();
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'LIVE Feed',
      headerStyle: {
        backgroundColor: '#323338',
        shadowColor: 'transparent',
      },
      headerTitleStyle: {
        paddingTop: 10,
        paddingBottom: 5,
        alignSelf: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        flex: 1,
        textAlignVertical: 'center',
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
    showNewPostsButton: false,
    isAtTop: true,
  };

  onRefresh = () => {
    if (this.props.newPostQueue.length > 0) {
      this.onGetNewPosts();
    }

    let created_at = this.props.allCampaigns[0]?.created_at;

    if (this.props.newPostQueue.length > 0) {
      created_at = this.props.newPostQueue[0].created_at;
    }

    this.setState({ refreshing: true });
    this.props.refreshFeed(created_at).finally(() => {
      this.setState({ refreshing: false });
    });
    if (!WebSocketManager.getInstance().connected) {
      WebSocketManager.getInstance().reconnect();
    }
  };

  onGetNewPosts = () => {
    this.setState({ showNewPostsButton: false });
    if (!this.props.loading) {
      this.props.dequeueNewPosts();
    }
    this.scrollView?.scrollToOffset?.({ offset: 0, animated: true });
  };

  onScrollToTop = () => {
    if (this.state.showNewPostsButton && !this.props.loading) {
      this.setState({ showNewPostsButton: false });
      this.props.dequeueNewPosts();
    }
  };

  onScroll = ({ nativeEvent }) => {
    if (isCloseToBottom(nativeEvent) && !this.state.gettingMorePosts) {
      // Oldest post we have
      const created_at = this.props.allCampaigns[
        this.props.allCampaigns.length - 1
      ].created_at;

      this.setState({ gettingMorePosts: true });

      return this.props.getFeed(created_at).finally(() => {
        this.setState({ gettingMorePosts: false });
      });
    }

    if (isCloseToTop(nativeEvent)) {
      this.setState({ isAtTop: true });
    } else {
      this.setState({ isAtTop: false });
    }
  };

  componentDidMount() {
    this.props.getFeed();
    this.props.navigation.setParams({
      roles: this.props.currentUserProfile.roles,
    });

    WebSocketManager.getInstance().subscribe('feed', this.props.queueNewPosts);
  }

  componentDidUpdate() {
    if (!WebSocketManager.getInstance().connected) {
      WebSocketManager.getInstance().reconnect();
    }

    if (
      this.props.newPostQueue.length > 0 &&
      this.state.showNewPostsButton === false
    ) {
      if (this.state.isAtTop) {
        this.onGetNewPosts();
      } else {
        this.setState({ showNewPostsButton: true });
      }
    } else if (
      this.props.newPostQueue.length === 0 &&
      this.state.showNewPostsButton === true
    ) {
      this.setState({ showNewPostsButton: false });
    }
  }

  componentWillUnmount() {
    WebSocketManager.getInstance().unsubscribe('feed');
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {this.props.feedError ||
        (!this.props.loading && this.props.allCampaigns.length === 0) ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {this.props.feedError ||
                'Something went wrong... Please try again'}
            </Text>
            <Button title="Retry" onPress={() => this.props.getFeed()} />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <Viewport.Tracker>
              <FlatList
                onRefresh={this.onRefresh}
                refreshing={this.state.refreshing}
                onScroll={this.onScroll}
                onScrollToTop={this.onScrollToTop}
                ref={(r) => (this.scrollView = r)}
                scrollEventThrottle={16}
                data={this.props.allCampaigns}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item: campaign }) => {
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
                }}
                stickyHeaderIndices={[0]}
                ListHeaderComponent={
                  <View style={{ flex: 1, zIndex: 99 }}>
                    {this.props.currentUserProfile.roles ===
                    'conservationist' ? (
                      <AddCampaignHeader
                        profile={this.props.currentUserProfile}
                        disabled={this.props.loading}
                      />
                    ) : null}
                    <View style={{ flex: 1 }}>
                      <NewPostsButton
                        show={this.state.showNewPostsButton}
                        onPress={this.onGetNewPosts}
                      />
                    </View>
                  </View>
                }
                ListHeaderComponentStyle={{
                  zIndex: 99,
                }}
                ListFooterComponent={
                  <View style={{ padding: 24 }}>
                    <ActivityIndicator
                      size="large"
                      style={{ opacity: this.state.gettingMorePosts ? 1 : 0 }}
                    />
                  </View>
                }
              />
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
  newPostQueue: state.newPostQueue,
});

export default connect(mapStateToProps, {
  getFeed,
  queueNewPosts,
  refreshFeed,
  dequeueNewPosts,
})(FeedScreen);
