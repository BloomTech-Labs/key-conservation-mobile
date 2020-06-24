import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { View } from 'react-native-animatable';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  getOriginalPost,
  addBookmark,
  removeBookmark,
  getCampaignUpdates,
} from '../store/actions';
import moment from 'moment';
import { Viewport } from '@skele/components';
import { navigate } from '../navigation/RootNavigator';

import BackButton from '../components/BackButton';
import CommentsView from '../components/Comments/CommentsView';
import styles from '../constants/screens/ViewCampaignScreen';
import Ellipse from '../assets/jsicons/Ellipse';
import CampaignActionSheet from '../components/Reports/CampaignActionSheet';
import TakeActionCallToAction from '../components/TakeAction/TakeActionCallToAction';
import MapMarker from '../assets/jsicons/headerIcons/map-marker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MediaViewer from '../components/MediaViewer';
import SmileSelector from '../components/FeedScreen/SmileSelector';
import BookmarkSolid from '../assets/jsicons/miscIcons/BookmarkSolid';
import Bookmark from '../assets/jsicons/miscIcons/Bookmark';
import CampaignPost from '../components/CampaignPost/CampaignPost';
import { shorten } from '../util';

class ViewCampaignScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Campaign',
      headerStyle: {
        backgroundColor: '#323338',
      },
      headerTintColor: '#fff',
      headerLeft: () => <BackButton navigation={navigation} popToTop />,
      headerRight: () => (
        <TouchableOpacity
          style={{
            transform: [{ rotate: '90deg' }],
            padding: 16,
            paddingRight: 24,
          }}
          onPress={navigation.getParam('showCampaignOptions')}
        >
          <Ellipse width="25" height="25" />
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);

    this.mounted = false;

    this.scrollView = React.createRef();

    if (!this.props.navigation.getParam('postId')) {
      // Crash the app if no postId is provided - Prevents developers from
      // releasing the app without fixing this issue
      throw new Error('No postId parameter provided to ViewCampaignScreen');
    } else {
      this.postId = this.props.navigation.getParam('postId');
    }
  }

  state = {
    isBookmarked: false,
    updates: [],
    updatesLoading: true,
    updatesError: '',
    topSectionHeight: 0,
    queueScroll: -1,
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;

    let campaign_id = this.props.navigation.getParam('campaign_id');

    if (campaign_id) {
      this.props.getOriginalPost(campaign_id);
    }

    campaign_id =
      campaign_id || this.props.openCampaigns[this.postId]?.campaign_id;

    if (this.props.navigation.getParam('updates')) {
      this.setState({
        updates: this.props.navigation.getParam('updates'),
        updatesLoading: false,
      });
    } else if (campaign_id) {
      this.props
        .getCampaignUpdates(campaign_id)
        .then((res) => {
          if (this.mounted)
            this.setState({
              updates: res?.data || [],
              updatesLoading: false,
            });
        })
        .catch((err) => {
          if (this.mounted)
            this.setState({
              updatesLoading: false,
              updatesError: err?.message || 'Failed to get updates',
            });
        });
    }

    this.props.navigation.setParams({
      showCampaignOptions: this.showActionSheet,
    });

    this.setBookmarked();
  }

  setBookmarked = () => {
    let isBookmarked = this.props.bookmarks?.filter(
      (bm) =>
        bm.campaign_id === this.props.openCampaigns[this.postId]?.campaign_id
    );
    isBookmarked = isBookmarked.length > 0;
    if (this.state.isBookmarked !== isBookmarked) {
      this.setState({ isBookmarked: isBookmarked });
    }
  };

  // Scroll to an update. If its location cannot be
  // determined yet, scrollToOffset queues it until
  // it can be, and then scrolls to to the target
  scrollToOffset(yOffset) {
    if (!this.state.topSectionHeight) {
      this.setState({
        queueScroll: yOffset,
      });
      return;
    }
    // Find out the position of the update
    const yPos = yOffset + this.state.topSectionHeight;

    this.scrollView?.scrollTo({ x: 0, y: yPos, animated: true });
  }

  componentDidUpdate() {
    this.setBookmarked();

    if (this.state.queueScroll !== -1 && this.state.topSectionHeight) {
      this.scrollToOffset(this.state.queueScroll);

      this.setState({ queueScroll: -1 });
    }
  }

  showActionSheet = () => {
    this.ActionSheet?.show();
  };

  viewOriginalPost = () => {
    const campaign = this.props.openCampaigns[this.postId];
    if (typeof camoaign?.campaign_id === 'number') {
      navigate(
        'Campaign',
        {
          campaign_id: campaign.campaign_id,
        },
        `${campaign.campaign_id}_${campaign.id}`
      );
    } else {
      console.log('Could not navigate to original post, invalid campaign id');
    }
  };

  handleBookmarkPressed = () => {
    if (this.state.isBookmarked) {
      this.props.removeBookmark(
        this.props.openCampaigns[this.postId]?.campaign_id
      );
    } else {
      this.props.addBookmark(this.props.openCampaigns[this.postId]);
    }

    this.setBookmarked();
  };

  render() {
    const post = this.props.openCampaigns[this.postId] || {};

    return (
      <View style={styles.mainContainer}>
        <KeyboardAwareScrollView
          innerRef={(r) => (this.scrollView = r)}
          extraScrollHeight={50}
          enableOnAndroid={false}
        >
          {post.is_update ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={this.viewOriginalPost}
            >
              <View style={styles.viewOriginalPost}>
                <Text style={styles.viewOriginalPostText}>
                  View Original Post
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
          <View
            style={styles.container}
            onLayout={({ nativeEvent }) => {
              this.setState({
                topSectionHeight:
                  nativeEvent.layout.height + nativeEvent.layout.y,
              });
            }}
          >
            {!this.props.loading ? (
              <CampaignActionSheet
                admin={this.props.currentUserProfile.admin}
                post={post}
                ref={(o) => (this.ActionSheet = o)}
                isMine={this.props.currentUserProfile.id === post.user_id}
                goBack
              />
            ) : null}
            <Viewport.Tracker>
              <View>
                <View style={styles.topRow}>
                  <View style={styles.topRowLeft}>
                    <Text style={styles.postTitle}>
                      {shorten(post.name, 75)}
                      &nbsp;
                    </Text>
                  </View>
                </View>
                <ListItem
                  onPress={this.goToProfile}
                  title={
                    <View>
                      <Text style={styles.listName}>{post.org_name}</Text>
                    </View>
                  }
                  leftAvatar={{
                    source: {
                      uri: post.profile_image || undefined,
                    },
                  }}
                  subtitle={
                    <View style={{ flexDirection: 'row' }}>
                      {post.location !== (undefined || null) ? (
                        <MapMarker fill="#505050" />
                      ) : null}
                      <Text style={{ color: '#929292', paddingLeft: 3 }}>
                        {post.location}
                      </Text>
                    </View>
                  }
                />
                <View style={styles.campaignDescriptionContainer}>
                  <Text style={styles.campaignDescription}>
                    <Text style={styles.timeText}>
                      {moment(post.created_at).fromNow()}
                    </Text>
                    &nbsp;&nbsp;
                    {post.description}
                  </Text>
                </View>
                <MediaViewer
                  source={post.image}
                  urgency={post.urgency}
                  isUpdate={post.is_update}
                />
                <View style={styles.campaignControls}>
                  <View style={styles.campaignControlsLeft}>
                    <SmileSelector postId={post.campaign_id || post.id} />
                  </View>
                  <View style={styles.campaignControlsRight}>
                    {this.props.currentUserProfile.roles === 'supporter' ? (
                      <TouchableOpacity
                        style={styles.rightSectionBookmark}
                        onPress={this.handleBookmarkPressed}
                      >
                        {this.props.bookmarksLoading ? (
                          <ActivityIndicator size="large" color="#ADADAD" />
                        ) : this.state.isBookmarked ? (
                          <BookmarkSolid />
                        ) : (
                          <Bookmark />
                        )}
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </View>

                <View style={styles.donateView}>
                  <TakeActionCallToAction
                    data={this.props.openCampaigns[this.postId]}
                    navigation={this.props.navigation}
                  />
                </View>

                <View style={styles.commentsView}>
                  {this.props.loading ? (
                    <Text>Loading comments...</Text>
                  ) : (
                    <View
                      onLayout={() => {
                        if (this.props.navigation.getParam('focusComments')) {
                          this.scrollToOffset(8);
                        }
                      }}
                      style={{ flex: 1 }}
                    >
                      <Text
                        style={{
                          fontFamily: 'Lato-Bold',
                          fontSize: 18,
                          paddingBottom: 8,
                        }}
                      >
                        Comments ({post.comments?.length || 0})
                      </Text>
                      <CommentsView
                        comments={post.comments}
                        campaignId={post.campaign_id}
                        postId={post.id}
                      />
                    </View>
                  )}
                </View>
              </View>
            </Viewport.Tracker>
          </View>
          {this.state.updatesLoading ? (
            <View style={styles.updatesLoadingContainer}></View>
          ) : this.state.updatesError ? (
            <Text style={styles.updatesLoadingError}>
              {this.state.updatesError}
            </Text>
          ) : this.state.updates?.filter((u) => u.id !== post.id).length > 0 ? (
            <View style={styles.container}>
              <Text style={styles.updatesTitle}>Latest updates</Text>
              {this.state.updates
                .filter((u) => u.id !== post.id)
                .map((update, index) => {
                  return (
                    <View
                      onLayout={({ nativeEvent }) => {
                        if (
                          index ===
                          this.props.navigation.getParam('targetUpdate')
                        ) {
                          this.scrollToOffset(nativeEvent.layout.y);
                        }
                      }}
                      style={{ flex: 1 }}
                      key={update.id}
                    >
                      {update.is_update ? null : (
                        <View style={styles.originalPostMarker}>
                          <Text style={styles.originalPostMarkerText}>
                            ORIGINAL POST
                          </Text>
                        </View>
                      )}
                      <CampaignPost
                        disableControls
                        disableHeader
                        hideRelated
                        data={update}
                        toggled={this.props.campaignsToggled.includes(
                          update.id
                        )}
                      />
                    </View>
                  );
                })}
            </View>
          ) : null}
        </KeyboardAwareScrollView>
      </View>
    );
  }

  addBookmark = () => {
    this.setState({
      userBookmarked: true,
    });
    this.props.navigation.state.params.addBookmark();
  };

  deleteBookmark = () => {
    this.setState({
      userBookmarked: false,
    });
    this.props.navigation.state.params.deleteBookmark();
  };

  goToProfile = () => {
    this.props.navigation.push('Profile', {
      selectedProfile: this.props.openCampaigns[this.postId]?.user_id,
    });
  };
}

const mapStateToProps = (state) => ({
  loading: state.pending.getCampaign,
  bookmarks: state.bookmarks,
  bookamrksLoading: state.pending.bookmarks,
  bookmarksError: state.errors.bookmarks,
  openCampaigns: state.openCampaigns,
  currentUser: state.currentUser,
  currentUserProfile: state.currentUserProfile,
  token: state.token,
  campaignsToggled: state.campaignsToggled,
});

export default connect(mapStateToProps, {
  getOriginalPost,
  addBookmark,
  removeBookmark,
  getCampaignUpdates,
})(ViewCampaignScreen);
