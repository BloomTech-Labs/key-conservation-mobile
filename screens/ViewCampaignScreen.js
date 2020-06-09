import React from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { View } from 'react-native-animatable';
import { ListItem, Badge } from 'react-native-elements';
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

    this.scrollView = React.createRef();
  }

  state = {
    isBookmarked: false,
    updates: [],
    updatesLoading: true,
    updatesError: '',
    hasFocused: false
  };

  onTargetUpdateLayout(yPos) {
    if (!this.state.hasFocused) {
      this.scrollView.scrollTo?.({ y: yPos + 1124, animated: true });
      this.setState({ hasFocused: true });
    }
  }

  componentDidMount() {
    let campaign_id = this.props.navigation.getParam('campaign_id');

    if (campaign_id) {
      this.props.getOriginalPost(campaign_id).finally(() => {
        this.loadPostData();
      });
    } else this.loadPostData();

    campaign_id = campaign_id || this.props.selectedCampaign.campaign_id;

    if (this.props.navigation.getParam('updates')) {
      this.setState({
        updates: this.props.navigation.getParam('updates'),
        updatesLoading: false,
      });
    } else if (campaign_id) {
      this.props
        .getCampaignUpdates(campaign_id)
        .then((res) => {
          this.setState({
            updates: res?.data || [],
            updatesLoading: false,
          });
        })
        .catch((err) => {
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
      (bm) => bm.campaign_id === this.state.campaign_id
    );
    isBookmarked = isBookmarked.length > 0;
    if (this.state.isBookmarked !== isBookmarked) {
      this.setState({ isBookmarked: isBookmarked });
    }
  };

  componentDidUpdate() {
    this.setBookmarked();
  }

  loadPostData() {
    const campaignPost = this.props.selectedCampaign || {};

    this.setState({
      createdAt: campaignPost.created_at
        ? moment(campaignPost.created_at).fromNow()
        : '...',
      ...campaignPost,
    });
  }

  showActionSheet = () => {
    this.ActionSheet?.show();
  };

  viewOriginalPost = () => {
    if (typeof Number(this.campaign_id) === 'number') {
      navigate(
        'Campaign',
        {
          campaign_id: this.state.campaign_id,
        },
        `${this.state.campaign_id}_${this.state.id}`
      );
    } else {
      console.log('Could not navigate to original post, invalid campaign id');
    }
  };

  handleBookmarkPressed = () => {
    if (this.state.isBookmarked) {
      this.props.removeBookmark(this.state.campaign_id);
    } else {
      this.props.addBookmark(this.state);
    }

    this.setBookmarked();
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <KeyboardAwareScrollView
          innerRef={(r) => (this.scrollView = r)}
          extraScrollHeight={50}
          enableOnAndroid={false}
        >
          {this.state.is_update ? (
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
          <View style={styles.container}>
            {!this.props.loading ? (
              <CampaignActionSheet
                admin={this.props.currentUserProfile.admin}
                post={this.state}
                ref={(o) => (this.ActionSheet = o)}
                isMine={this.props.currentUserProfile.id === this.state.user_id}
                goBack
              />
            ) : null}
            <Viewport.Tracker>
              <View>
                <View style={styles.topRow}>
                  <View style={styles.topRowLeft}>
                    <Text style={styles.postTitle}>{this.state.name}</Text>
                  </View>
                  <View style={styles.topRowRight}>
                    <Text style={styles.timeText}>{this.state.createdAt}</Text>
                  </View>
                </View>
                <ListItem
                  onPress={this.goToProfile}
                  title={
                    <View>
                      <Text style={styles.listName}>{this.state.org_name}</Text>
                    </View>
                  }
                  leftAvatar={{
                    source: {
                      uri: this.state.profile_image || undefined,
                    },
                  }}
                  subtitle={
                    <View style={{ flexDirection: 'row' }}>
                      {this.state.location !== (undefined || null) ? (
                        <MapMarker fill="#505050" />
                      ) : null}
                      <Text style={{ color: '#929292', paddingLeft: 3 }}>
                        {this.state.location}
                      </Text>
                    </View>
                  }
                />
                <View style={styles.campaignDescriptionContainer}>
                  <Text style={styles.campaignDescription}>
                    {this.state.description}
                  </Text>
                </View>
                <MediaViewer
                  source={this.state.image}
                  urgency={this.state.urgency}
                  isUpdate={this.state.is_update}
                />
                <View style={styles.campaignControls}>
                  <View style={styles.campaignControlsLeft}>
                    <SmileSelector
                      postId={this.state.campaign_id || this.state.id}
                    />
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
                    data={this.props.selectedCampaign}
                    navigation={this.props.navigation}
                  />
                </View>

                <View style={styles.commentsView}>
                  {this.props.loading ? (
                    <Text>Loading comments...</Text>
                  ) : (
                    <View
                      onLayout={(event) => {
                        if (this.props.navigation.getParam('focusComments')) {
                          const layout = event.nativeEvent.layout;
                          this.onTargetUpdateLayout(layout.y + 72);
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
                        Comments ({this.state.comments?.length || 0})
                      </Text>
                      <CommentsView comments={this.state.comments} />
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
          ) : this.state.updates?.filter((u) => u.id !== this.state.id).length >
            0 ? (
            <View style={styles.container}>
              <Text style={styles.updatesTitle}>Latest updates</Text>
              {this.state.updates
                .filter((u) => u.id !== this.state.id)
                .map((update, index) => {
                  return (
                    <View
                      onLayout={(event) => {
                        if (
                          index ===
                          this.props.navigation.getParam('targetUpdate')
                        ) {
                          const layout = event.nativeEvent.layout;
                          this.onTargetUpdateLayout(layout.y);
                        }
                      }}
                      style={{ flex: 1 }}
                      key={update.id}
                    >
                      <CampaignPost
                        disableControls
                        disableHeader
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
    this.props.navigation.navigate('Pro', {
      selectedProfile: this.state.user_id,
    });
  };
}

const mapStateToProps = (state) => ({
  loading: state.pending.getCampaign,
  bookmarks: state.bookmarks,
  bookamrksLoading: state.pending.bookmarks,
  bookmarksError: state.errors.bookmarks,
  selectedCampaign: state.selectedCampaign,
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
