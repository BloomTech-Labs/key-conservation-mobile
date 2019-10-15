import React, { useState, useEffect } from 'react';
import {
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Platform
} from 'react-native';
import { View } from 'react-native-animatable';
import moment from 'moment';
import { Video } from 'expo-av';
import { Avatar } from 'react-native-elements';
import { ListItem } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { AmpEvent } from '../withAmplitude';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

import {
  getProfileData,
  getCampaign,
  toggleCampaignText
} from '../../store/actions';

import styles from '../../constants/FeedScreen/FeedCampaign';
import styles2 from '../../constants/Comments/Comments';
import { Viewport } from '@skele/components';

// url for heroku staging vs production server
const seturl = 'https://key-conservation-staging.herokuapp.com/api/';

const ViewportAwareVideo = Viewport.Aware(Video);

const FeedCampaign = props => {
  const [likes, setLikes] = useState(props.data.likes.length);
  const [userLiked, setUserLiked] = useState(false);
  const [userBookmarked, setUserBookmarked] = useState(false);
  const [urgTop, setUrgTop] = useState(0);
  useEffect(() => {
    const liked = data.likes.filter(
      l => l.users_id === props.currentUserProfile.id
    );
    const bookmarked = props.currentUserProfile.bookmarks.filter(
      b => b.camp_id === data.camp_id
    );
    if (liked.length > 0) {
      setUserLiked(true);
    }
    if (bookmarked.length > 0) {
      setUserBookmarked(true);
    }
    if (
      data.camp_img.includes('.mov') ||
      data.camp_img.includes('.mp3') ||
      data.camp_img.includes('.mp4')
    ) {
      setUrgTop(3);
    }
  }, []);
  const dispatch = useDispatch();
  const { data, toggled } = props;
  const shorten = (string, cutoff) => {
    if (string.length < cutoff) {
      return string;
    } else {
      let end = cutoff;
      const avoidChars = [' ', ',', '.', '!'];
      while (avoidChars.includes(string.charAt(end)) && end >= cutoff - 10) {
        end--;
      }
      return `${string.substring(0, end)}...`;
    }
  };
  const createdAt = data.created_at;
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
  //// All styles for the urgency bar
  let urgencyColor;
  if (data.urgency === 'Critical') {
    urgencyColor = '#FF476DBF';
  } else if (data.urgency === 'Urgent') {
    urgencyColor = '#FFE743BF';
  } else if (data.urgency === 'Longterm') {
    urgencyColor = '#74F7B3BF';
  } else {
    urgencyColor = '#323338BF';
  }
  let urgencyStatus;
  if (data.urgency) {
    urgencyStatus = data.urgency.toUpperCase();
  } else {
    urgencyStatus = 'Standard';
  }
  const urgencyStyles = {
    backgroundColor: urgencyColor,
    height: 37,
    width: '100%',
    position: 'absolute',
    top: urgTop,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  };
  const goToProfile = async () => {
    await dispatch(getProfileData(data.users_id));
    AmpEvent('Select Profile from Campaign', {
      profile: data.username,
      campaign: data.camp_name
    });
    props.navigation.navigate('Pro');
  };
  const goToCampaign = async () => {
    await dispatch(getCampaign(data.camp_id));
    AmpEvent('Select Profile from Campaign', {
      campaign: data.camp_name,
      profile: data.username
    });
    props.navigation.navigate('Camp', {
      likes: likes,
      userLiked: userLiked,
      addLike: addLike,
      deleteLike: deleteLike,
      userBookmarked: userBookmarked,
      addBookmark: addBookmark,
      deleteBookmark: deleteBookmark,
      media: data.camp_img
    });
  };
  const toggleText = () => {
    dispatch(toggleCampaignText(data.camp_id));
  };
  const addLike = () => {
    axios
      .post(
        `${seturl}social/likes/${data.camp_id}`,
        {
          users_id: props.currentUserProfile.id,
          camp_id: data.camp_id
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${props.token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        setLikes(res.data.data.length);
        setUserLiked(true);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const deleteLike = () => {
    axios
      .delete(
        `${seturl}social/likes/${data.camp_id}/${props.currentUserProfile.id}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${props.token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        setLikes(likes - 1);
        setUserLiked(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const addBookmark = () => {
    axios
      .post(
        `${seturl}social/bookmark/${data.camp_id}`,
        {
          users_id: props.currentUserProfile.id,
          camp_id: data.camp_id
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${props.token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        setUserBookmarked(true);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const deleteBookmark = () => {
    axios
      .delete(
        `${seturl}social/bookmark/${data.camp_id}/${props.currentUserProfile.id}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${props.token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        setUserBookmarked(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View style={styles.container}>
      <ListItem
        onPress={goToProfile}
        title={
          <View>
            <Text style={styles.orgTitleView}>{data.username}</Text>
          </View>
        }
        leftAvatar={{ source: { uri: data.profile_image } }}
        subtitle={data.location}
      />
      <View>
        <TouchableOpacity activeOpacity={0.5} onPress={goToCampaign}>
          {data.camp_img.includes('.mov') ||
          data.camp_img.includes('.mp3') ||
          data.camp_img.includes('.mp4') ? (
            <View>
              {data.urgency ? (
                <View style={urgencyStyles}>
                  <Text style={styles.urgencyBarText}>{urgencyStatus}</Text>
                </View>
              ) : null}
              <ViewportAwareVideo
                source={{
                  uri: data.camp_img
                }}
                innerRef={ref => (video = ref)}
                onViewportEnter={() =>
                  video.setStatusAsync({
                    shouldPlay: true,
                    positionMillis: 0
                  })
                }
                onViewportLeave={() =>
                  video.setStatusAsync({
                    shouldPlay: false,
                    positionMillis: 0
                  })
                }
                rate={1.0}
                isMuted={true}
                isLooping
                resizeMode="cover"
                style={styles.campImgContain}
              />
            </View>
          ) : (
            <ImageBackground
              source={{ uri: data.camp_img }}
              style={styles.campImgContain}
            >
              {data.urgency ? (
                <View style={urgencyStyles}>
                  <Text style={styles.urgencyBarText}>{urgencyStatus}</Text>
                </View>
              ) : null}
            </ImageBackground>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.iconRow}>
        <View style={styles.likesContainer}>
          <View style={styles.hearts}>
            <View style={!userLiked ? { zIndex: 1 } : { zIndex: -1 }}>
              <FontAwesome
                onPress={() => addLike()}
                name="heart-o"
                style={styles.heartOutline}
              />
            </View>
            <View
              animation={userLiked ? 'zoomIn' : 'zoomOut'}
              style={
                (userLiked ? { zIndex: 1 } : { zIndex: -1 },
                Platform.OS === 'android'
                  ? { marginTop: -29, marginLeft: -1.25 }
                  : { marginTop: -28.75, marginLeft: -1.25 })
              }
              duration={300}
            >
              <FontAwesome
                onPress={() => deleteLike()}
                name="heart"
                style={styles.heartFill}
              />
            </View>
          </View>
          {likes === 0 ? null : likes > 1 ? (
            <Text style={styles.likes}>{likes} likes</Text>
          ) : (
            <Text style={styles.likes}>{likes} like</Text>
          )}
        </View>
        <View style={styles.bookmarks}>
          <View style={!userBookmarked ? { zIndex: 1 } : { zIndex: -1 }}>
            <FontAwesome
              onPress={() => addBookmark()}
              name="bookmark-o"
              style={styles.bookmarkOutline}
            />
          </View>
          <View
            animation={userBookmarked ? 'zoomIn' : 'zoomOut'}
            style={
              (userBookmarked ? { zIndex: 1 } : { zIndex: -1 },
              { marginTop: -28.75, marginLeft: -1.25 })
            }
            duration={300}
          >
            <FontAwesome
              onPress={() => deleteBookmark()}
              name="bookmark"
              style={styles.bookmarkFill}
            />
          </View>
        </View>
      </View>
      <View style={styles.campDesc}>
        <Text style={styles.campDescName}>{data.camp_name}</Text>
        {toggled || data.camp_desc.length < 80 ? (
          <Text style={styles.campDescText}>{data.camp_desc}</Text>
        ) : (
          <Text style={styles.campDescText}>
            {shorten(data.camp_desc, 80)}
            &nbsp;
            <Text onPress={toggleText} style={styles.readMore}>
              Read More
            </Text>
          </Text>
        )}
      </View>
      <View style={{ marginLeft: 17 }}>
        <FlatList
          data={data.comments.slice(0, 1)}
          keyExtractor={comment => comment.comment_id}
          renderItem={({ item }) => {
            return (
              <View style={styles2.commentWrapper}>
                <View style={styles2.commentView}>
                  <View style={styles2.feedAvatar}>
                    <Avatar
                      rounded
                      source={{
                        uri: item.profile_image
                      }}
                    />
                  </View>
                  <View style={styles2.feedCommentWrapper}>
                    <Text style={styles2.username}>{item.username}</Text>
                    <Text style={styles2.commentBody}>{item.comment_body}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
      <View>
        {data.comments.length >= 1 ? (
          data.comments.length === 1 ? (
            <Text style={styles.comments} onPress={goToCampaign}>
              View {data.comments.length} comment
            </Text>
          ) : (
            <Text style={styles.comments} onPress={goToCampaign}>
              View all {data.comments.length} comments
            </Text>
          )
        ) : null}
      </View>
      <Text style={styles.timeText}>{timeDiff}</Text>
      <View style={styles.demarcation}></View>
    </View>
  );
};
const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
  currentUser: state.currentUser,
  token: state.token
});
export default connect(
  mapStateToProps,
  {
    getProfileData,
    getCampaign,
    toggleCampaignText
  }
)(FeedCampaign);
