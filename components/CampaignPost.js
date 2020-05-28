import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { View } from 'react-native-animatable';
import moment from 'moment';
import { ListItem, Badge } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';

import {
  toggleCampaignText,
  setCampaign,
  addBookmark,
  removeBookmark,
  fetchBookmarks,
} from '../store/actions';
import { AmpEvent } from './withAmplitude';
import LoadingOverlay from './LoadingOverlay';

import { navigate } from '../navigation/RootNavigator';

import styles from '../constants/CampaignPost';
import Ellipse from '../assets/jsicons/Ellipse';
import CommentIcon from '../assets/jsicons/CommentIcon';
import MapMarker from '../assets/jsicons/headerIcons/map-marker';
import CampaignActionSheet from './Reports/CampaignActionSheet';
import TakeActionCallToAction from './TakeAction/TakeActionCallToAction';
import SmileSelector from './FeedScreen/SmileSelector';
import Bookmark from '../assets/jsicons/miscIcons/Bookmark';
import BookmarkSolid from '../assets/jsicons/miscIcons/BookmarkSolid';
import { shorten } from '../util';
import MediaViewer from './MediaViewer';

const CampaignPost = (props) => {
  const { data, toggled } = props;

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setBookmark();
  }, [props.bookmarks]);

  const setBookmark = () => {
    const thisCampaign = data?.campaign_id;
    const isSaved = props.bookmarks.filter(
      (bookmark) => bookmark.campaign_id === thisCampaign
    );
    setIsSaved(isSaved.length > 0);
  };

  const actionSheetRef = useRef(null);

  const dispatch = useDispatch();

  const createdAt = data.created_at;
  const timeDiff = moment(createdAt).fromNow();

  moment.updateLocale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s',
      s: '1s',
      ss: '%ss',
      m: '1m',
      mm: '%dm',
      h: '1h',
      hh: '%dh',
      d: '1d',
      dd: '%dd',
      M: '1m',
      MM: '%d months',
      y: '1y',
      yy: '%dY',
    },
  });

  const [animation] = useState(new Animated.Value(0));

  const animateIn = Animated.timing(animation, {
    useNativeDriver: true,
    toValue: 1,
    duration: 300,
  });

  useEffect(() => {
    animateIn.start();
  }, [animation]);

  const goToProfile = () => {
    AmpEvent('Select Profile from Campaign', {
      profile: data.org_name,
      campaign: data.campaign_name,
    });
    navigate('Pro', { selectedProfile: data.user_id });
  };

  const handleBookmarkPressed = () => {
    if (isSaved) {
      props.removeBookmark(props.data.campaign_id);
    } else {
      props.addBookmark(props.data);
    }

    updateBookmarkIcon();
  };

  const goToCampaign = async () => {
    AmpEvent('Select Profile from Campaign', {
      campaign: data.campaign_name,
      profile: data.org_name,
    });

    dispatch(setCampaign(data));
    navigate('Campaign', {
      userBookmarked: data.userBookmarked,
    });
  };

  const toggleText = () => {
    dispatch(toggleCampaignText(data.id));
  };

  const showActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const updateBookmarkIcon = () => {
    setBookmark();
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-650, 0],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.25, 1],
  });

  return (
    <Animated.View
      style={[
        styles.mainContainer,
        { transform: [{ translateY: translateY }], opacity: opacity },
      ]}
    >
      <View style={styles.container}>
        <LoadingOverlay
          loading={props.deleteBuffer.includes(data.id)}
          backgroundColor="white"
        />
        <CampaignActionSheet
          ref={actionSheetRef}
          admin={props.currentUserProfile.admin}
          isMine={props.currentUserProfile.id === data.user_id}
          post={data}
        />
        <View style={styles.topRow}>
          <View style={styles.topRowLeft}>
            <Text style={styles.postTitle}>{data.name}</Text>
          </View>
          <View style={styles.topRowRight}>
            <Text style={styles.timeText}>{timeDiff}</Text>
          </View>
        </View>
        <ListItem
          containerStyle={styles.listItemStyle}
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
              <View
                style={{
                  marginTop: -12,
                  height: 25,
                  width: 40,
                  paddingRight: 5,
                  alignItems: 'flex-end',
                }}
              >
                <Ellipse fill="#000" height="25" width="25" />
              </View>
            </TouchableOpacity>
          }
          subtitle={
            <View
              style={{ flexDirection: 'row', marginLeft: -12, marginTop: 3 }}
            >
              {data.location !== (undefined || null) ? (
                <MapMarker fill="#505050" />
              ) : null}
              <Text style={{ color: '#929292', paddingLeft: 3 }}>
                {data.location}
              </Text>
            </View>
          }
        />
        <View style={styles.campaignDescription}>
          {toggled || data.description?.length < 80 ? (
            <View>
              <Text style={styles.campaignDescriptionText}>
                {data.description}
              </Text>
            </View>
          ) : (
            <Text style={styles.campaignDescriptionText}>
              {shorten(data.description, 280)}
              &nbsp;
              <Text onPress={toggleText} style={styles.readMore}>
                Read More
              </Text>
            </Text>
          )}
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.5} onPress={goToCampaign}>
            <MediaViewer
              source={data.image}
              urgency={data.urgency}
              isUpdate={data.is_update}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.campaignControls}>
          <View style={styles.campaignControlsLeft}>
            <View style={{ marginLeft: 8, marginBottom: -60, paddingTop: 10 }}>
              <SmileSelector postId={data.campaign_id || data.id} />
            </View>
          </View>
          <View style={styles.campaignControlsRight}>
            {props.currentUserProfile.roles === 'supporter' ? (
              <TouchableOpacity
                style={styles.rightSectionBookmark}
                onPress={handleBookmarkPressed}
              >
                {props.bookmarksLoading ? (
                  <ActivityIndicator size="large" color="#ADADAD" />
                ) : isSaved ? (
                  <BookmarkSolid />
                ) : (
                  <Bookmark />
                )}
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              style={styles.rightSectionComment}
              onPress={goToCampaign}
            >
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
                  top: -8,
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
    </Animated.View>
  );
};

const mapStateToProps = (state) => ({
  currentUserProfile: state.currentUserProfile,
  currentUser: state.currentUser,
  token: state.token,
  deleteBuffer: state.pending.deletePost,
  bookmarks: state.bookmarks,
  bookmarksLoading: state.pending.bookmarks,
  bookmarksError: state.errors.bookmarks,
});

export default connect(mapStateToProps, {
  toggleCampaignText,
  addBookmark,
  removeBookmark,
  fetchBookmarks,
})(CampaignPost);
