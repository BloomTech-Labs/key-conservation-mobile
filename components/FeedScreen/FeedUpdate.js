import React, { useState, useEffect } from 'react';
import {
  Text,
  ImageBackground,
  TouchableOpacity,
  Platform
} from 'react-native';
import { View } from 'react-native-animatable';
import moment from 'moment';
import { Video } from 'expo-av';
import { ListItem } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { AmpEvent } from '../withAmplitude';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import {
  getProfileData,
  setCampaign,
  toggleCampaignText
} from '../../store/actions';
import styles from '../../constants/FeedScreen/FeedUpdate';
import { Viewport } from '@skele/components';

// url for heroku staging vs production server
const seturl = 'https://key-conservation-staging.herokuapp.com/api/';

const Placeholder = () => <View style={styles.campImgContain} />;

const ViewportAwareVideo = Viewport.Aware(
  Viewport.WithPlaceholder(Video, Placeholder)
);

const FeedUpdate = props => {
  const [likes, setLikes] = useState(props.data.likes.length);
  const [userLiked, setUserLiked] = useState(false);

  useEffect(() => {
    const liked = data.likes.filter(
      l => l.users_id === props.currentUserProfile.id
    );
    if (liked.length > 0) {
      setUserLiked(true);
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

  const goToProfile = async () => {
    await dispatch(getProfileData(data.users_id));
    AmpEvent('Select Profile from Campaign', {
      profile: data.username,
      campaign: data.camp_name
    });
    props.navigation.navigate('Pro');
  };

  const goToCampUpdate = () => {
    dispatch(setCampaign(data));
    props.navigation.navigate('CampUpdate', {
      backBehavior: 'Home',
      likes: likes,
      userLiked: userLiked,
      addLike: addLike,
      deleteLike: deleteLike,
      media: data.update_img
    });
  };

  const toggleText = () => {
    dispatch(toggleCampaignText(`update${data.update_id}`));
  };

  const addLike = () => {
    axios
      .post(
        `${seturl}social/update/${data.update_id}`,
        {
          users_id: props.currentUserProfile.id,
          update_id: data.update_id
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
    console.log('Hi');
    axios
      .delete(
        `${seturl}social/update/${data.update_id}/${props.currentUserProfile.id}`,
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

  return (
    <View style={styles.container}>
      {props.hideUsername === undefined && (
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
      )}
      <View>
        <TouchableOpacity activeOpacity={0.5} onPress={goToCampUpdate}>
          {data.update_img.includes('.mov') ||
          data.update_img.includes('.mp3') ||
          data.update_img.includes('.mp4') ? (
            <View>
              <View style={styles.updateBar}>
                <Text style={styles.updateBarText}>UPDATE</Text>
              </View>
              <ViewportAwareVideo
                source={{
                  uri: data.camp_img
                }}
                retainOnceInViewport={false}
                preTriggerRatio={-0.1}
                rate={1.0}
                isMuted={false}
                shouldPlay={true}
                isLooping
                resizeMode="cover"
                style={styles.campImgContain}
              />
            </View>
          ) : (
            <ImageBackground
              source={{ uri: data.update_img }}
              style={styles.campImgContain}
            >
              <View style={styles.updateBar}>
                <Text style={styles.updateBarText}>UPDATE</Text>
              </View>
            </ImageBackground>
          )}
        </TouchableOpacity>
      </View>
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
      <View style={styles.campDesc}>
        <Text style={styles.campDescName}>{data.camp_name}</Text>
        {toggled || data.update_desc.length < 80 ? (
          <Text style={styles.campDescText}>{data.update_desc}</Text>
        ) : (
          <Text style={styles.campDescText}>
            {shorten(data.update_desc, 80)}
            &nbsp;
            <Text onPress={toggleText} style={styles.readMore}>
              Read More
            </Text>
          </Text>
        )}
      </View>
      <Text style={styles.timeText}>{timeDiff}</Text>
      <View style={styles.demarcation}></View>
    </View>
  );
};
const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
  token: state.token
});
export default connect(
  mapStateToProps,
  {
    getProfileData,
    setCampaign,
    toggleCampaignText
  }
)(FeedUpdate);
