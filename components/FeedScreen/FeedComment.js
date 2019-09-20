import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import moment from 'moment';

import { ListItem } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { AmpEvent } from '../withAmplitude';
import {
  getProfileData,
  setCampaign,
  toggleCampaignText
} from '../../store/actions';

import styles from '../../constants/FeedScreen/FeedUpdate';

const FeedComment = () => {
  // if (props.data.comments_length >= 1) {
  //   return (
  //     <View style={styles.container}>
  // {props.data.comments_length === 1 ? (
  //   <Text>View {props.data.comments_length} comment...</Text>
  // ) : (
  //   <Text>View all {props.data.comments_length} comments...</Text>
  // )}
  //     </View>
  //   );
  // }
  <View>
    <Text>Hihihi</Text>
  </View>;
};

export default FeedComment;
