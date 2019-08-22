import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import moment from 'moment';
import SvgUri from 'react-native-svg-uri';

import { ListItem, Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { AmpEvent } from '../withAmplitude';
import {
  getProfileData,
  setCampaign,
  toggleCampaignText,
  getCampaignUpdate
} from '../../store/actions';

import styles from '../../constants/Stylesheet';

const FeedUpdate = props => {
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
    props.navigation.navigate('CampUpdate', {backBehavior: 'Home'});
  };

  const toggleText = () => {
    dispatch(toggleCampaignText(`update${data.update_id}`));
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
        <View style={styles.updateBar}>
          <Text style={styles.updateBarText}>UPDATE</Text>
        </View>
        <TouchableOpacity activeOpacity={0.5} onPress={goToCampUpdate}>
          <Image
            source={{ uri: data.update_img }}
            style={styles.campImgContain}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.goToCampaignButton}
        onPress={goToCampUpdate}
      >
        <Text style={styles.goToCampaignText}>See Update {'>'}</Text>
      </TouchableOpacity>
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
    </View>
  );
};

export default FeedUpdate;
