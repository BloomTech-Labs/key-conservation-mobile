import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { ScrollView, NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { getFeed, queueNewPosts } from '../store/actions';
import CampaignPost from '../components/CampaignPost';
import styles from '../constants/screens/FeedScreen';
import { Viewport } from '@skele/components';
import AddCampaignHeader from '../components/FeedScreen/AddCampaignHeader';

import Search from '../assets/jsicons/SearchIcon';
import LoadingOverlay from '../components/LoadingOverlay';
import WebSocketManager from '../websockets/WebSocketManager';

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
      WebSocketManager().getInstance().reconnect;
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
      <Viewport.Tracker>
        <View style={{ flex: 1 }}>
          {this.props.feedError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{this.props.feedError}</Text>
              <Button title="Retry" onPress={this.props.getFeed} />
            </View>
          ) : (
            <ScrollView scrollEventThrottle={16} stickyHeaderIndices={[0]}>
              <View>
                {this.props.currentUserProfile.roles === 'conservationist' ? (
                  <AddCampaignHeader
                    profile={this.props.currentUserProfile}
                    disabled={this.props.loading}
                  />
                ) : null}
              </View>
              <View style={styles.feedContainer}>
                <LoadingOverlay loading={this.props.loading} />
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
            </ScrollView>
            // {/* {this.state.campaignsVisible < this.props.allCampaigns.length && (
            //   <View style={styles.loadMoreView}>
            //     <TouchableOpacity
            //       onPress={this.addMoreCampaigns}
            //       style={styles.loadMoreTouchable}
            //     >
            //       <Text style={styles.loadMoreText}>View More Campaigns</Text>
            //     </TouchableOpacity>
            //   </View>
            // )} */}
          )}
        </View>
      </Viewport.Tracker>
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

export default connect(mapStateToProps, { getFeed, queueNewPosts })(FeedScreen);
