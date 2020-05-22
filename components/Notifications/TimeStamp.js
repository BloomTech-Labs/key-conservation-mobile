import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';

const TimeStamp = (props) => {
  const currentTime = moment();
  const postTime = moment(props.createdAt);
  let timeDiff;
  if (currentTime.diff(postTime, 'days') < 1) {
    if (currentTime.diff(postTime, 'hours') < 1) {
      if (currentTime.diff(postTime, 'minutes') < 1) {
        timeDiff = 'just now';
      } else {
        if (currentTime.diff(postTime, 'minutes') === 1) {
          timeDiff = `${currentTime.diff(postTime, 'minutes')} minute ago`;
        } else {
          timeDiff = `${currentTime.diff(postTime, 'minutes')} minutes ago`;
        }
      }
    } else {
      if (currentTime.diff(postTime, 'hours') === 1) {
        timeDiff = `${currentTime.diff(postTime, 'hours')} hour ago`;
      } else {
        timeDiff = `${currentTime.diff(postTime, 'hours')} hours ago`;
      }
    }
  } else {
    if (currentTime.diff(postTime, 'days') === 1) {
      timeDiff = `${currentTime.diff(postTime, 'days')} day ago`;
    } else {
      timeDiff = `${currentTime.diff(postTime, 'days')} days ago`;
    }
  }

  return <Text style={props.style}>{timeDiff}</Text>;
};

export default TimeStamp;
