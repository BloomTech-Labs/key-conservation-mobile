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
import moment from 'moment';
import { Viewport } from '@skele/components';

import BackButton from '../components/BackButton';
import { AmpEvent } from '../components/withAmplitude';
import FeedUpdate from '../components/FeedScreen/FeedUpdate';
import CommentsView from '../components/Comments/CommentsView';
import Hand from '../assets/jsicons/detailAboutUs/Hand';
import styles from '../constants/screens/ViewCampScreen';
import Ellipse from '../assets/jsicons/Ellipse';
import CampaignActionSheet from '../components/Reports/CampaignActionSheet';
import TakeActionCta from '../components/TakeAction/TakeActionCta';

// Redux gave us a hard time on this project. We worked on comments first and when our commentOnCampaign action failed to trigger the re-render we expected, and when we couldn't solve the
// issue in labs_help, we settled for in-component axios calls. Not elegant. Probably not super scalable—but it worked. Hopefully a more talented team can solve what we couldn't.
// In the meantime, ViewCampScreen, ViewCampUpdateScreen, FeedCampaign, and FeedUpdate are all interconnected, sharing props (state, functions) via React-Navigation.

// const { data } = props;

class ViewCampScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Campaign',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerLeft: () => <BackButton navigation={navigation} popToTop />,
      headerRight: () => (
        <TouchableOpacity
          style={{
            transform: [{ rotate: '90deg' }],
            padding: 16,
            paddingRight: 24
          }}
          onPress={navigation.getParam('showCampOptions')}
        >
          <Ellipse width='25' height='25' />
        </TouchableOpacity>
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ showCampOptions: this.showActionSheet });
  }

  state = {
    userBookmarked: this.props.navigation.state.params.userBookmarked
  };

  showActionSheet = () => {
    this.ActionSheet?.show();
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
        <CampaignActionSheet
          admin={this.props.currentUserProfile.admin}
          camp={this.props.selectedCampaign}
          ref={o => (this.ActionSheet = o)}
          isMine={
            this.props.currentUserProfile.admin ===
            this.props.selectedCampaign.users_id
          }
          goBack
        />
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
                        <Text style={styles.listName}>
                          {this.props.selectedCampaign.name}
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
                    <TakeActionCta donate={this.props.selectedCampaign} />
                  </View>

                  <View style={styles.feedContainer}>
                    {sortedUpdates !== false &&
                      sortedUpdates.map(update => {
                        return (
                          <FeedUpdate
                            key={`update${update.update_id}`}
                            data={update}
                            toggled
                            hideName
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
                        <Text style={styles.listName}>
                          {this.props.selectedCampaign.name}
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

                  {/* <View style={styles.bookmarks}>
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
                          this.state.userBookmarked ? "zoomIn" : "zoomOut"
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
                  </View>  */}

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
                    <TakeActionCta donate={this.props.selectedCampaign} />
                  </View>

                  <View style={styles.feedContainer}>
                    {sortedUpdates !== false &&
                      sortedUpdates.map(update => {
                        return (
                          <FeedUpdate
                            key={`update${update.update_id}`}
                            data={update}
                            toggled
                            hideName
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
    this.props.navigation.navigate('Pro', {
      selectedProfile: this.props.selectedCampaign.users_id
    });
  };
}

const mapStateToProps = state => ({
  selectedCampaign: state.selectedCampaign,
  currentUser: state.currentUser,
  currentUserProfile: state.currentUserProfile,
  token: state.token
});

export default connect(mapStateToProps)(ViewCampScreen);
