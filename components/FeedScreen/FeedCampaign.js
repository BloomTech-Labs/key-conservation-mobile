import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';

import { ListItem } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { AmpEvent } from '../withAmplitude';
import {
  getProfileData,
  getCampaign,
  toggleCampaignText
} from '../../store/actions';

import styles from '../../constants/FeedScreen/FeedCampaign';

const FeedCampaign = props => {
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
  
  let updateColor;
  if (data.urgency === 'Critical') {
    updateColor = '#FF6C7C'
  } else if (data.urgency === 'Urgent') {
    updateColor = '#FFDB11'
  } else if (data.urgency === 'Longterm') {
    updatecolor = '#66FFA5'
  } else {
    updateColor = '#323338'
  }

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
    props.navigation.navigate('Camp');
  };

  const toggleText = () => {
    dispatch(toggleCampaignText(data.camp_id));
  };
  console.log('feed campaign, data check', data)
  console.log('updateColor', updateColor)
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
      <View style={updateStyles}>
        <Text style={styles.urgencyBarText}>{data.urgency}</Text>
      </View>
      <View>
        <TouchableOpacity activeOpacity={0.5} onPress={goToCampaign}>
          <Image
            source={{ uri: data.camp_img }}
            style={styles.campImgContain}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.goToCampaignButton}
        onPress={goToCampaign}
      >
        <Text style={styles.goToCampaignText}>See Post {'>'}</Text>
      </TouchableOpacity>
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
      <View style={styles.comments}>
        {data.comments_length >= 1 ? (
          data.comments_length === 1 ? (
            <Text>{data.comments_length} comment</Text>
          ) : (
            <Text>{data.comments_length} comments</Text>
          )
        ) : null}
      </View>
      {/* <FeedComment /> */}
      <Text style={styles.timeText}>{timeDiff}</Text>
      <View style={styles.demarcation}></View>
    </View>
  );
};

const updateStyles = {
  backgroundColor: '#323338',
  // backgroundColor: updateColor, 
  alignItems: 'center',
  justifyContent: 'center',
  height: 37,
  width: '100%'
}

export default FeedCampaign;
