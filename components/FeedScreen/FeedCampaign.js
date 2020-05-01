import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
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
  setCampaign,
  addBookmark,
  removeBookmark,
  fetchBookmarks,
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
import SmileSelector from './SmileSelector';
import Bookmark from '../../assets/jsicons/miscIcons/Bookmark';
import BookmarkSolid from '../../assets/jsicons/miscIcons/BookmarkSolid';

const Placeholder = () => <View style={styles.campImgContain} />;

const ViewportAwareVideo = Viewport.Aware(
  Viewport.WithPlaceholder(Video, Placeholder)
);

const FeedCampaign = (props) => {
  const [urgTop, setUrgTop] = useState(0);
  const [loader, setLoader] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // prevent re-fetching unecessarily on profiles
    if (props.displayOn !== 'profile') {
      props.fetchBookmarks(props.currentUserProfile.id);
    }
  }, []);

  useEffect(() => {
    setBookmark();
  }, [props.bookmarks.campaignIDs]);

  const setBookmark = () => {
    const thisCampaign =
      props.data.campaign_id || props.data?.comments[0]?.campaign_id;
    const isSaved = props.bookmarks.campaignIDs.filter(
      (bookmark) => bookmark === thisCampaign
    );
    setIsSaved(isSaved.length > 0);
  };

  const actionSheetRef = useRef(null);

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
    zIndex: 1,
  };

  const goToProfile = () => {
    AmpEvent('Select Profile from Campaign', {
      profile: data.org_name,
      campaign: data.campaign_name,
    });
    navigate('Pro', { selectedProfile: data.user_id });
  };

  const goToCampaign = async () => {
    AmpEvent('Select Profile from Campaign', {
      campaign: data.campaign_name,
      profile: data.org_name,
    });

    if (data.campaign_id) {
      await dispatch(setCampaign(data));
      navigate('CampaignUpdate', {
        media: data.image,
      });
    } else {
      await dispatch(getCampaign(data.id));
      navigate('Campaign', {
        media: data.image,
      });
    }
  };

  const toggleText = () => {
    dispatch(toggleCampaignText(data.id));
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isBuffering && !status.isPlaying) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  };

  const showActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const updateBookmarkIcon = () => {
    setBookmark();
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
          leftAvatar={{
            source: { uri: data.profile_image || undefined },
            size: 'medium',
          }}
          rightElement={
            <TouchableOpacity onPress={showActionSheet}>
              <Ellipse fill="#000" height="25" width="25" />
            </TouchableOpacity>
          }
          subtitle={
            <View style={{ flexDirection: 'row', marginLeft: -10 }}>
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
                      uri: data.image,
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

        <View style={styles.campaignControls}>
          <View style={styles.campaignControlsLeft}>
            <TouchableOpacity
              style={{ marginLeft: 8, marginBottom: -60, paddingTop: 10 }}
            >
              <SmileSelector
                tableName="campaigns"
                postId={data.campaign_id || data.id}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.campaignControlsRight}>
            {isSaved ? (
              <TouchableOpacity
                style={styles.comments}
                onPress={() => {
                  props.removeBookmark(
                    props.currentUserProfile.id,
                    props.data.campaign_id || props.data.comments[0].campaign_id
                  );
                  updateBookmarkIcon();
                }}
              >
                {props.bookmarks.loading ? (
                  <ActivityIndicator size="large" color="#ADADAD" />
                ) : (
                  <BookmarkSolid />
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.comments}
                onPress={() => {
                  props.addBookmark(
                    props.currentUserProfile.id,
                    props.data.campaign_id || props.data.comments[0].campaign_id
                    // the OR condition above accounts for the fact that some campaigns
                    // don't appear to have an ID in the (top-level) object returned from the API.
                    // Those without a top-level ID have the campaign ID referenced in their
                    // comments, so we can grab the ID from there. it's unclear to me if
                    // this is a bug or the intentional behavior - worth looking into maybe?
                  );
                  updateBookmarkIcon();
                }}
              >
                {props.bookmarks.loading ? (
                  <ActivityIndicator size="large" color="#ADADAD" />
                ) : (
                  <Bookmark />
                )}
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.comments} onPress={goToCampaign}>
              <CommentIcon />
              <Badge
                textStyle={{
                  color: 'black',
                  fontSize: 15,
                }}
                badgeStyle={{
                  backgroundColor: '#CAFF03',
                }}
                containerStyle={{
                  position: 'absolute',
                  top: -6,
                  right: -3,
                }}
                value={data.comments ? data.comments.length : 0}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TakeActionCallToAction donate={props.data} />
        <View style={styles.demarcation} />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  currentUserProfile: state.currentUserProfile,
  currentUser: state.currentUser,
  token: state.token,
  deleteBuffer: state.pending.deleteCampaign,
  bookmarks: state.bookmarks,
});

export default connect(mapStateToProps, {
  getCampaign,
  toggleCampaignText,
  addBookmark,
  removeBookmark,
  fetchBookmarks,
})(withNavigationFocus(FeedCampaign));
// withNavigationFocus unmounts video and prevents audio playing across the navigation stack
