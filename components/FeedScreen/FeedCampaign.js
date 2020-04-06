import React, { useState, useRef } from 'react';
import {
  Text,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { View } from 'react-native-animatable';
import moment from 'moment';
import { Video } from 'expo-av';
import { ListItem, Badge } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Viewport } from '@skele/components';

import {
  getCampaign,
  toggleCampaignText,
  setCampaign
} from '../../store/actions';
import { AmpEvent } from '../withAmplitude';
import LoadingOverlay from '../LoadingOverlay';

import { navigate } from '../../navigation/RootNavigator';

import styles from '../../constants/FeedScreen/FeedCampaign';
import Ellipse from '../../assets/jsicons/Ellipse';
import CommentIcon from '../../assets/jsicons/CommentIcon';
import MapMarker from '../../assets/jsicons/headerIcons/map-marker';
import CampaignActionSheet from '../Reports/CampaignActionSheet';
import TakeActionCallToAction from '../TakeAction/TakeActionCallToAction';

const Placeholder = () => <View style={styles.campImgContain} />;

// Redux gave us a hard time on this project. We worked on comments first and when our commentOnCampaign action failed to trigger the re-render we expected, and when we couldn't solve the
// issue in labs_help, we settled for in-component axios calls. Not elegant. Probably not super scalable—but it worked. Hopefully a more talented team can solve what we couldn't.
// In the meantime, ViewCampaignScreen, ViewCampaignUpdateScreen, FeedCampaign, and FeedUpdate are all interconnected, sharing props (state, functions) via React-Navigation.

const ViewportAwareVideo = Viewport.Aware(
  Viewport.WithPlaceholder(Video, Placeholder)
);

const FeedCampaign = props => {
  // const [userBookmarked, setUserBookmarked] = useState(false);
  const [urgTop, setUrgTop] = useState(0);
  const [loader, setLoader] = useState(true);

  const actionSheetRef = useRef(null);

  // console.log("PROPS FROM FEEDCAMPAIGN", props);

  // old code for Bookmarks
  // useEffect(() => {
  //   const bookmarked = props.currentUserProfile.bookmarks.filter(
  //     b => b.id === data.id
  //   );
  //   if (bookmarked.length > 0) {
  //     setUserBookmarked(true);
  //   }
  //   if (
  //     data.image.includes('.mov') ||
  //     data.image.includes('.mp3') ||
  //     data.image.includes('.mp4')
  //   ) {
  //     setUrgTop(3);
  //   }
  // }, []);

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
    urgencyColor = 'rgba(227,16,89,0.6)';
  } else if (data.urgency === 'Urgent') {
    urgencyColor = 'rgba(255,199,0,0.6)';
  } else if (data.urgency === 'Longterm') {
    urgencyColor = 'rgba(0,255,157,0.6)';
  } else if (data.urgency === 'Update') {
    urgencyColor = 'rgba(202,255,0, 0.7)';
  } else {
    urgencyColor = 'none';
  }
  let urgencyStatus;
  if (!data.urgency || data.urgency == 'null') {
    urgencyStatus = '';
  } else {
    urgencyStatus = data.urgency.toUpperCase();
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

  const goToProfile = () => {
    AmpEvent('Select Profile from Campaign', {
      profile: data.name,
      campaign: data.campaign_name
    });
    navigate('Profile', { selectedProfile: data.user_id });
  };

  const goToCampaign = async () => {
    AmpEvent('Select Profile from Campaign', {
      campaign: data.campaign_name,
      profile: data.name
    });

    if (data.campaign_id) {
      await dispatch(setCampaign(data));
      navigate('CampaignUpdate', {
        media: data.image
      });
    } else {
      await dispatch(getCampaign(data.id));
      navigate('Campaign', {
        media: data.image
      });
    }
  };

  const toggleText = () => {
    dispatch(toggleCampaignText(data.id));
  };

  const onPlaybackStatusUpdate = status => {
    if (status.isBuffering && !status.isPlaying) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  };

  // const addBookmark = () => {
  //   axios
  //     .post(
  //       `${seturl}social/bookmark/${data.campaign_id}`,
  //       {
  //         user_id: props.currentUserProfile.id,
  //         campaign_id: data.campaign_id
  //       },
  //       {
  //         headers: {
  //           Accept: 'application/json',
  //           Authorization: `Bearer ${props.token}`,
  //           'Content-Type': 'application/json'
  //         }
  //       }
  //     )
  //     .then(res => {
  //       setUserBookmarked(true);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  // const deleteBookmark = () => {
  //   axios
  //     .delete(
  //       `${seturl}social/bookmark/${data.campaign_id}/${props.currentUserProfile.id}`,
  //       {
  //         headers: {
  //           Accept: 'application/json',
  //           Authorization: `Bearer ${props.token}`,
  //           'Content-Type': 'application/json'
  //         }
  //       }
  //     )
  //     .then(res => {
  //       setUserBookmarked(false);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  const showActionSheet = () => {
    actionSheetRef.current?.show();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <LoadingOverlay
          loading={props.deleteBuffer.includes(data.id)}
          backgroundColor="white"
        />
        <CampaignActionSheet
          ref={actionSheetRef}
          admin={props.currentUserProfile.admin}
          isMine={props.currentUserProfile.id === data.user_id}
          campaign={data}
        />
        <ListItem
          disabled={props.disableHeader}
          onPress={goToProfile}
          title={
            <View style={styles.name}>
              <Text style={styles.orgTitleView}>{data.org_name}</Text>
            </View>
          }
          leftAvatar={{ source: { uri: data.profile_image || undefined } }}
          rightElement={
            <TouchableOpacity onPress={showActionSheet}>
              <Ellipse fill="#000" height="25" width="25" />
            </TouchableOpacity>
          }
          subtitle={
            <View style={{ flexDirection: 'row' }}>
              {data.location !== (undefined || null) ? (
                <MapMarker fill="#505050" />
              ) : null}
              <Text style={{ color: '#929292' }}>{data.location}</Text>
            </View>
          }
        />
        <View style={styles.campaignDescription}>
          {toggled || data.description.length < 80 ? (
            <View>
              <Text style={styles.campaignDescriptionText}>
                {data.description}
              </Text>
              <Text style={styles.timeText}>{timeDiff}</Text>
            </View>
          ) : (
            <Text style={styles.campaignDescriptionText}>
              {shorten(data.description, 80)}
              &nbsp;
              <Text onPress={toggleText} style={styles.readMore}>
                Read More
              </Text>
            </Text>
          )}
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.5} onPress={goToCampaign}>
            {data.image.includes('.mov') ||
            data.image.includes('.mp3') ||
            data.image.includes('.mp4') ? (
              <View>
                {data.urgency ? (
                  <View style={urgencyStyles}>
                    <Text style={styles.urgencyBarText}>{urgencyStatus}</Text>
                  </View>
                ) : null}
                {loader ? (
                  <View style={styles.indicator}>
                    <ActivityIndicator size="large" color="#00FF9D" />
                  </View>
                ) : null}
                {props.isFocused ? (
                  <ViewportAwareVideo
                    source={{
                      uri: data.image
                    }}
                    retainOnceInViewport={false}
                    preTriggerRatio={-0.1}
                    rate={1.0}
                    isMuted={false}
                    shouldPlay={true}
                    isLooping
                    resizeMode="cover"
                    onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                    style={styles.campImgContain}
                  />
                ) : (
                  <View style={styles.campImgContain} />
                )}
              </View>
            ) : (
              <ImageBackground
                source={{ uri: data.image }}
                style={styles.campImgContain}
              >
                {urgencyStatus ? (
                  <View style={urgencyStyles}>
                    <Text style={styles.urgencyBarText}>{urgencyStatus}</Text>
                  </View>
                ) : null}
              </ImageBackground>
            )}
          </TouchableOpacity>
        </View>

        {/* <View style={styles.bookmarks}>
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
      </View>  */}

        <View style={styles.commentContainer}>
          <TouchableOpacity style={styles.comments} onPress={goToCampaign}>
            <CommentIcon />
            <Badge
              textStyle={{
                color: 'black',
                fontSize: 15
              }}
              badgeStyle={{
                backgroundColor: '#CAFF03'
              }}
              containerStyle={{
                position: 'absolute',
                top: -2,
                right: 2
              }}
              value={data.comments ? data.comments.length : 0}
            />
          </TouchableOpacity>
        </View>
        <TakeActionCallToAction donate={props.data} />
      </View>
      <View style={styles.demarcation} />
    </View>
  );
};
const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
  currentUser: state.currentUser,
  token: state.token,
  deleteBuffer: state.pending.deleteCampaign
});
export default connect(mapStateToProps, {
  getCampaign,
  toggleCampaignText
})(withNavigationFocus(FeedCampaign));
// withNavigationFocus unmounts video and prevents audio playing across the navigation stack
