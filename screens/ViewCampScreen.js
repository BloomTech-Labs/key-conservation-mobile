import React from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { View } from 'react-native-animatable';
import { Video } from 'expo-av';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-navigation';
import * as WebBrowser from 'expo-web-browser';
import { connect } from 'react-redux';
import SvgUri from 'react-native-svg-uri';
import moment from 'moment';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { Viewport } from '@skele/components';

import { getProfileData } from '../store/actions';
import BackButton from '../components/BackButton';
import { AmpEvent } from '../components/withAmplitude';
import FeedUpdate from '../components/FeedScreen/FeedUpdate';
import CommentsView from '../components/Comments/CommentsView';

import styles from '../constants/screens/ViewCampScreen';

// Redux gave us a hard time on this project. We worked on comments first and when our commentOnCampaign action failed to trigger the re-render we expected, and when we couldn't solve the
// issue in labs_help, we settled for in-component axios calls. Not elegant. Probably not super scalable—but it worked. Hopefully a more talented team can solve what we couldn't.
// In the meantime, ViewCampScreen, ViewCampUpdateScreen, FeedCampaign, and FeedUpdate are all interconnected, sharing props (state, functions) via React-Navigation.

class ViewCampScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Campaign',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center'
      },
      headerLeft: <BackButton navigation={navigation} popToTop />,
      headerRight: <View />
    };
  };

  state = {
    likes: this.props.navigation.state.params.likes,
    userLiked: this.props.navigation.state.params.userLiked,
    userBookmarked: this.props.navigation.state.params.userBookmarked
  };

  render() {
    let sortedUpdates = false;
    if (
      this.props.selectedCampaign.updates &&
      this.props.selectedCampaign.updates.length
    ) {
      sortedUpdates = this.props.selectedCampaign.updates.sort(function(a, b) {
        return moment(a.created_at) - moment(b.created_at);
      });
    }

    const createdAt = this.props.selectedCampaign.created_at;
    const currentTime = moment();
    const postTime = moment(createdAt);
    let timeDiff;
    if (currentTime.diff(postTime, 'days') < 1) {
      if (currentTime.diff(postTime, 'hours') < 1) {
        if (currentTime.diff(postTime, 'minutes') < 1) {
          timeDiff = 'just now';
        } else {
          if (currentTime.diff(postTime, 'minutes') === 1) {
            timeDiff = `${currentTime.diff(postTime, 'minutes')} MINUTE AGO`;
          } else {
            timeDiff = `${currentTime.diff(postTime, 'minutes')} MINUTES AGO`;
          }
        }
      } else {
        if (currentTime.diff(postTime, 'hours') === 1) {
          timeDiff = `${currentTime.diff(postTime, 'hours')} HOUR AGO`;
        } else {
          timeDiff = `${currentTime.diff(postTime, 'hours')} HOURS AGO`;
        }
      }
    } else {
      if (currentTime.diff(postTime, 'days') === 1) {
        timeDiff = `${currentTime.diff(postTime, 'days')} DAY AGO`;
      } else {
        timeDiff = `${currentTime.diff(postTime, 'days')} DAYS AGO`;
      }
    }

    return (
      <View>
        {Platform.OS === 'android' ? (
          <KeyboardAvoidingView
            enabled
            keyboardVerticalOffset={86}
            behavior='height'
          >
            <Viewport.Tracker>
              <ScrollView>
                <View>
                  <ListItem
                    onPress={this.goToProfile}
                    title={
                      <View>
                        <Text style={styles.listUsername}>
                          {this.props.selectedCampaign.username}
                        </Text>
                      </View>
                    }
                    leftAvatar={{
                      source: { uri: this.props.selectedCampaign.profile_image }
                    }}
                    subtitle={this.props.selectedCampaign.location}
                  />
                  {this.props.navigation.state.params.media.includes('.mov') ||
                  this.props.navigation.state.params.media.includes('.mp3') ||
                  this.props.navigation.state.params.media.includes('.mp4') ? (
                    <Video
                      source={{
                        uri: this.props.selectedCampaign.camp_img
                      }}
                      rate={1.0}
                      volume={1.0}
                      useNativeControls={true}
                      resizeMode='cover'
                      style={styles.campImgContain}
                    />
                  ) : (
                    <Image
                      source={{ uri: this.props.selectedCampaign.camp_img }}
                      style={styles.campImgContain}
                    />
                  )}
                  <View style={styles.iconRow}>
                    <View style={styles.likesContainer}>
                      <View style={styles.hearts}>
                        <View
                          style={
                            !this.state.userLiked
                              ? { zIndex: 1 }
                              : { zIndex: -1 }
                          }
                        >
                          <FontAwesome
                            onPress={() =>
                              this.addLike(this.props.selectedCampaign.camp_id)
                            }
                            name='heart-o'
                            style={styles.heartOutline}
                          />
                        </View>
                        <View
                          animation={
                            this.state.userLiked ? 'zoomIn' : 'zoomOut'
                          }
                          style={
                            (this.state.userLiked
                              ? { zIndex: 1 }
                              : { zIndex: -1 },
                            { marginTop: -29, marginLeft: -1.25 })
                          }
                          duration={300}
                        >
                          <FontAwesome
                            onPress={() =>
                              this.deleteLike(
                                this.props.selectedCampaign.camp_id
                              )
                            }
                            name='heart'
                            style={styles.heartFill}
                          />
                        </View>
                      </View>
                      {this.state.likes === 0 ? null : this.state.likes > 1 ? (
                        <Text style={styles.likes}>
                          {this.state.likes} likes
                        </Text>
                      ) : (
                        <Text style={styles.likes}>
                          {this.state.likes} like
                        </Text>
                      )}
                    </View>
                    <View style={styles.bookmarks}>
                      <View
                        style={
                          !this.state.userBookmarked
                            ? { zIndex: 1 }
                            : { zIndex: -1 }
                        }
                      >
                        <FontAwesome
                          onPress={() => this.addBookmark()}
                          name='bookmark-o'
                          style={styles.bookmarkOutline}
                        />
                      </View>
                      <View
                        animation={
                          this.state.userBookmarked ? 'zoomIn' : 'zoomOut'
                        }
                        style={
                          (this.state.userBookmarked
                            ? { zIndex: 1 }
                            : { zIndex: -1 },
                          { marginTop: -28.75, marginLeft: -1.25 })
                        }
                        duration={300}
                      >
                        <FontAwesome
                          onPress={() => this.deleteBookmark()}
                          name='bookmark'
                          style={styles.bookmarkFill}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.campDescContain}>
                    <Text style={styles.campDescName}>
                      {this.props.selectedCampaign.camp_name}
                    </Text>
                    <Text style={styles.campDesc}>
                      {this.props.selectedCampaign.camp_desc}
                    </Text>
                    <Text style={styles.timeText}>{timeDiff}</Text>
                  </View>
                  <View style={styles.commentsView}>
                    <CommentsView />
                  </View>
                  <View style={styles.donateView}>
                    <View style={styles.campMission}>
                      <SvgUri
                        fill='#3b3b3b'
                        width='25'
                        height='25'
                        source={require('../assets/icons/hand.svg')}
                      />
                      <Text style={styles.supportMissionText}>
                        Support Our Mission
                      </Text>
                      <Text style={styles.campMissionText}>
                        Your donation helps us more{'\n'}than you know. Thanks!
                      </Text>
                    </View>
                    <View style={styles.donateButton}>
                      <TouchableOpacity
                        style={styles.touchableButton}
                        // If these links are empty string and don't have an http:// or a https:// it will send you with unpromised rejections.
                        onPress={async () =>
                          this.props.selectedCampaign.camp_cta &&
                          this.props.selectedCampaign.camp_cta !== null &&
                          (await WebBrowser.openBrowserAsync(
                            this.props.selectedCampaign.camp_cta
                          )) &&
                          AmpEvent('Campaign Donation Button Clicked', {
                            username: this.props.username,
                            campId: this.props.selectedCampaign.camp_id
                          })
                        }
                      >
                        <View style={styles.touchableView}>
                          <Text style={styles.touchableText}>Donate</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.feedContainer}>
                    {sortedUpdates !== false &&
                      sortedUpdates.map(update => {
                        return (
                          <FeedUpdate
                            key={`update${update.update_id}`}
                            data={update}
                            toggled
                            hideUsername
                            navigation={this.props.navigation}
                            fromCampScreen={true}
                          />
                        );
                      })}
                  </View>
                </View>
              </ScrollView>
            </Viewport.Tracker>
          </KeyboardAvoidingView>
        ) : (
          <KeyboardAwareScrollView extraScrollHeight={50}>
            <Viewport.Tracker>
              <ScrollView>
                <View>
                  <ListItem
                    onPress={this.goToProfile}
                    title={
                      <View>
                        <Text style={styles.listUsername}>
                          {this.props.selectedCampaign.username}
                        </Text>
                      </View>
                    }
                    leftAvatar={{
                      source: { uri: this.props.selectedCampaign.profile_image }
                    }}
                    subtitle={this.props.selectedCampaign.location}
                  />
                  {this.props.navigation.state.params.media.includes('.mov') ||
                  this.props.navigation.state.params.media.includes('.mp3') ||
                  this.props.navigation.state.params.media.includes('.mp4') ? (
                    <Video
                      source={{
                        uri: this.props.selectedCampaign.camp_img
                      }}
                      rate={1.0}
                      volume={1.0}
                      isMuted={true}
                      useNativeControls={true}
                      resizeMode='cover'
                      style={styles.campImgContain}
                    />
                  ) : (
                    <Image
                      source={{ uri: this.props.selectedCampaign.camp_img }}
                      style={styles.campImgContain}
                    />
                  )}
                  <View style={styles.iconRow}>
                    <View style={styles.likesContainer}>
                      <View style={styles.hearts}>
                        <View
                          style={
                            !this.state.userLiked
                              ? { zIndex: 1 }
                              : { zIndex: -1 }
                          }
                        >
                          <FontAwesome
                            onPress={() =>
                              this.addLike(this.props.selectedCampaign.camp_id)
                            }
                            name='heart-o'
                            style={styles.heartOutline}
                          />
                        </View>
                        <View
                          animation={
                            this.state.userLiked ? 'zoomIn' : 'zoomOut'
                          }
                          style={
                            (this.state.userLiked
                              ? { zIndex: 1 }
                              : { zIndex: -1 },
                            { marginTop: -28.75, marginLeft: -1.25 })
                          }
                          duration={300}
                        >
                          <FontAwesome
                            onPress={() =>
                              this.deleteLike(
                                this.props.selectedCampaign.camp_id
                              )
                            }
                            name='heart'
                            style={styles.heartFill}
                          />
                        </View>
                      </View>
                      {this.state.likes === 0 ? null : this.state.likes > 1 ? (
                        <Text style={styles.likes}>
                          {this.state.likes} likes
                        </Text>
                      ) : (
                        <Text style={styles.likes}>
                          {this.state.likes} like
                        </Text>
                      )}
                    </View>
                    <View style={styles.bookmarks}>
                      <View
                        style={
                          !this.state.userBookmarked
                            ? { zIndex: 1 }
                            : { zIndex: -1 }
                        }
                      >
                        <FontAwesome
                          onPress={() => this.addBookmark()}
                          name='bookmark-o'
                          style={styles.bookmarkOutline}
                        />
                      </View>
                      <View
                        animation={
                          this.state.userBookmarked ? 'zoomIn' : 'zoomOut'
                        }
                        style={
                          (this.state.userBookmarked
                            ? { zIndex: 1 }
                            : { zIndex: -1 },
                          { marginTop: -28.75, marginLeft: -1.25 })
                        }
                        duration={300}
                      >
                        <FontAwesome
                          onPress={() => this.deleteBookmark()}
                          name='bookmark'
                          style={styles.bookmarkFill}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.campDescContain}>
                    <Text style={styles.campDescName}>
                      {this.props.selectedCampaign.camp_name}
                    </Text>
                    <Text style={styles.campDesc}>
                      {this.props.selectedCampaign.camp_desc}
                    </Text>
                    <Text style={styles.timeText}>{timeDiff}</Text>
                  </View>
                  <View style={styles.commentsView}>
                    <CommentsView />
                  </View>
                  <View style={styles.donateView}>
                    <View style={styles.campMission}>
                      <SvgUri
                        fill='#3b3b3b'
                        width='25'
                        height='25'
                        source={require('../assets/icons/hand.svg')}
                      />
                      <Text style={styles.supportMissionText}>
                        Support Our Mission
                      </Text>

                      <Text style={styles.campMissionText}>
                        Your donation helps us more than you know. Thanks!
                      </Text>
                    </View>
                    <View style={styles.donateButton}>
                      <TouchableOpacity
                        style={styles.touchableButton}
                        // If these links are empty string and don't have an http:// or a https:// it will send you with unpromised rejections.
                        onPress={async () =>
                          this.props.selectedCampaign.camp_cta &&
                          this.props.selectedCampaign.camp_cta !== null &&
                          (await WebBrowser.openBrowserAsync(
                            this.props.selectedCampaign.camp_cta
                          )) &&
                          AmpEvent('Campaign Donation Button Clicked', {
                            username: this.props.username,
                            campId: this.props.selectedCampaign.camp_id
                          })
                        }
                      >
                        <View style={styles.touchableView}>
                          <Text style={styles.touchableText}>Donate</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.feedContainer}>
                    {sortedUpdates !== false &&
                      sortedUpdates.map(update => {
                        return (
                          <FeedUpdate
                            key={`update${update.update_id}`}
                            data={update}
                            toggled
                            hideUsername
                            navigation={this.props.navigation}
                            fromCampScreen={true}
                          />
                        );
                      })}
                  </View>
                </View>
              </ScrollView>
            </Viewport.Tracker>
          </KeyboardAwareScrollView>
        )}
        {/* Two different views to support iOS keyboard awareness for an input inside a child component */}
      </View>
    );
  }

  addLike = campId => {
    this.setState({
      ...this.state,
      likes: this.state.likes + 1,
      userLiked: true
    });
    this.props.navigation.state.params.addLike(campId);
  };

  deleteLike = campId => {
    this.setState({
      ...this.state,
      likes: this.state.likes - 1,
      userLiked: false
    });
    this.props.navigation.state.params.deleteLike(campId);
  };

  addBookmark = () => {
    this.setState({
      ...this.state,
      userBookmarked: true
    });
    this.props.navigation.state.params.addBookmark();
  };

  deleteBookmark = () => {
    this.setState({
      ...this.state,
      userBookmarked: false
    });
    this.props.navigation.state.params.deleteBookmark();
  };

  goToProfile = () => {
    this.props.getProfileData(this.props.selectedCampaign.users_id);
    this.props.navigation.navigate('Pro');
  };
}

const mapStateToProps = state => ({
  selectedCampaign: state.selectedCampaign,
  currentUser: state.currentUser,
  currentUserProfile: state.currentUserProfile,
  token: state.token
});

export default connect(
  mapStateToProps,
  { getProfileData }
)(ViewCampScreen);
