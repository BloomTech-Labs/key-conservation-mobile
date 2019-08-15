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

import { getProfileData, getCampaign, toggleCampaignText } from '../../store/actions';

import styles from '../../constants/Stylesheet';

const FeedCampaign = props => {
  const dispatch = useDispatch();
  const { data, toggled } = props;
  const shorten = (string, cutoff) => {
    if (string.length < cutoff) {
      return string;
    } else {
      let end = cutoff;
      const avoidChars = [" ", ",", "."];
      while (avoidChars.includes(string.charAt(end)) && end >= cutoff - 10) {
        end--
      }
      return `${string.substring(0, end)}...`;
    };
  };

 const createdAt = data.created_at;
 const currentTime = moment();
 const postTime = moment(createdAt);
 let timeDiff
 if (currentTime.diff(postTime, 'days') < 1) {
   if (currentTime.diff(postTime, 'hours') < 1) {
    if (currentTime.diff(postTime, 'minutes') < 1) {
      timeDiff = 'just now'
    } else {
      if (currentTime.diff(postTime, 'minutes') === 1) {
        timeDiff = `${currentTime.diff(postTime, 'minutes')} MINUTE AGO`
      } else {
        timeDiff = `${currentTime.diff(postTime, 'minutes')} MINUTES AGO`
      }
    }
   } else {
    if (currentTime.diff(postTime, 'hours') === 1) {
      timeDiff = `${currentTime.diff(postTime, 'hours')} HOUR AGO`
    } else {
      timeDiff = `${currentTime.diff(postTime, 'hours')} HOURS AGO`
    }
  }
 } else {
  if (currentTime.diff(postTime, 'days') === 1) {
    timeDiff = `${currentTime.diff(postTime, 'days')} DAY AGO`
  } else {
    timeDiff = `${currentTime.diff(postTime, 'days')} DAYS AGO`
  }
}

  const goToProfile = async () => {
    await dispatch(getProfileData(data.users_id));
    props.navigation.navigate('Pro');
  };

  const goToCampaign = async () => {
    await dispatch(getCampaign(data.camp_id));
    props.navigation.navigate('Camp');
  };

  const toggleText = () => {
    dispatch(toggleCampaignText(data.camp_id))
  }

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
        <TouchableOpacity activeOpacity = { .5 } onPress={goToCampaign}>
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
        <Text style={styles.goToCampaignText}>See Post  {'>'}</Text>
      </TouchableOpacity>
      <View style={styles.campDesc}>
        <Text style={styles.campDescName}>{data.camp_name}</Text>
        {
          toggled || data.camp_desc.length < 80
          ? 
          <Text style={styles.campDescText}>
            {data.camp_desc}
          </Text>
          :
          <Text style={styles.campDescText}>
            {shorten(data.camp_desc, 80)}
            &nbsp;
            <Text 
              onPress={toggleText}
              style={styles.readMore}>Read More
            </Text>
          </Text>
        }
      </View>
      <Text style={styles.timeText}>{timeDiff}</Text>
    </View>
  );
};

FeedCampaign.navigationOptions = {
  title: 'Profile',
  // This setting needs to be on every screen so that header is in the center
  // This is fix for android devices should be good on IOS
  headerTitleStyle: {
    textAlign: 'center',
    flexGrow: 1,
    alignSelf: 'center'
  }
};

export default FeedCampaign;
