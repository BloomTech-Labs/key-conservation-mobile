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
import { ListItem } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Viewport } from '@skele/components';

import { navigate } from '../../navigation/RootNavigator';

import { setCampaign, toggleCampaignText } from '../../store/actions';
import { AmpEvent } from '../withAmplitude';
import LoadingOverlay from '../LoadingOverlay';

import Ellipse from '../../assets/jsicons/Ellipse';
import CampaignActionSheet from '../Reports/CampaignActionSheet';
import MapMarker from '../../assets/jsicons/headerIcons/map-marker';
import styles from '../../constants/FeedScreen/FeedUpdate';

const Placeholder = () => <View style={styles.campImgContain} />;

const ViewportAwareVideo = Viewport.Aware(
  Viewport.WithPlaceholder(Video, Placeholder)
);

const FeedUpdate = props => {
  const [loader, setLoader] = useState(true);
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

  const goToProfile = () => {
    AmpEvent('Select Profile from Campaign', {
      profile: data.name,
      campaign: data.campaign_name
    });
    navigate('Pro', { selectedProfile: data.user_id });
  };

  const goToCampaignUpdate = () => {
    dispatch(setCampaign(data));
    navigate('CampaignUpdate', {
      backBehavior: 'Home',
      media: data.image
    });
  };

  const toggleText = () => {
    dispatch(toggleCampaignText(`update${data.id}`));
  };

  const onPlaybackStatusUpdate = status => {
    if (status.isBuffering && !status.isPlaying) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  };

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
          update={data}
        />
        {props.hideName === undefined && (
          <ListItem
            onPress={goToProfile}
            title={
              <View>
                <Text style={styles.orgTitleView}>{data.org_name}</Text>
              </View>
            }
            leftAvatar={{ source: { uri: data.profile_image } }}
            rightElement={
              <TouchableOpacity
                onPress={showActionSheet}
                style={{ padding: 12 }}
              >
                <Ellipse fill="#000" height="25" width="25" />
              </TouchableOpacity>
            }
            subtitle={
              <View>
                <Text style={styles.subtitleText}>
                  {data.location !== (undefined || null) ? (
                    <MapMarker fill="#505050" />
                  ) : null}
                  {data.location}
                </Text>
              </View>
            }
          />
        )}
        <View style={styles.campaignDescription}>
          {toggled || data.description.length < 80 ? (
            <Text style={styles.campaignDescriptionText}>
              {data.description}
            </Text>
          ) : (
            <Text style={styles.campaignDescriptionText}>
              {shorten(data.description, 80)}
              &nbsp;
              <Text onPress={toggleText} style={styles.readMore}>
                Read More
              </Text>
            </Text>
          )}
          <Text style={styles.timeText}>{timeDiff}</Text>
        </View>
        <View>
          {props.fromCampaignScreen ? (
            <View>
              {data.image.includes('.mov') ||
              data.image.includes('.mp3') ||
              data.image.includes('.mp4') ? (
                <View>
                  {loader ? (
                    <View style={styles.indicator}>
                      <ActivityIndicator size="large" color="#00FF9D" />
                    </View>
                  ) : null}
                  <View style={styles.updateBar}>
                    <Text style={styles.updateBarText}>UPDATE</Text>
                  </View>
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
                  <View style={styles.updateBar}>
                    <Text style={styles.updateBarText}>UPDATE</Text>
                  </View>
                </ImageBackground>
              )}
            </View>
          ) : (
            <TouchableOpacity activeOpacity={0.5} onPress={goToCampaignUpdate}>
              {data.image.includes('.mov') ||
              data.image.includes('.mp3') ||
              data.image.includes('.mp4') ? (
                <View>
                  {loader ? (
                    <View style={styles.indicator}>
                      <ActivityIndicator size="large" color="#00FF9D" />
                    </View>
                  ) : null}
                  <View style={styles.updateBar}>
                    <Text style={styles.updateBarText}>UPDATE</Text>
                  </View>
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
                  <View style={styles.updateBar}>
                    <Text style={styles.updateBarText}>UPDATE</Text>
                  </View>
                </ImageBackground>
              )}
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.demarcation}></View>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  deleteBuffer: state.pending.deleteCampaignUpdate,
  currentUserProfile: state.currentUserProfile,
  token: state.token
});

export default connect(mapStateToProps, {
  setCampaign,
  toggleCampaignText
})(withNavigationFocus(FeedUpdate));
// withNavigationFocus unmounts video and prevents audio playing across the navigation stack
