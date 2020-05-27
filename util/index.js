import React from 'react';
import { View, Dimensions } from 'react-native';
import { Viewport } from '@skele/components';
import { Video } from 'expo-av';

// This file is for all kinds of miscellaneous helper functions & components
// that could be useful throughout the entire app, even if just in two places

// If you see any repetitve helper functions that would fit into here,
// add it. If you write a function that you think has a general enough
// purpose to go here, add it.

// Shorten returns a shortened string truncated by charLimit, and an ellipse
// is added to the end if the text gets trimmed at all
export const shorten = (text, charLimit) => {
  if (!text) return '';
  else if (text.length > charLimit) {
    let end = charLimit;
    const avoidChars = [' ', ',', '.', '!'];
    while (avoidChars.includes(text.charAt(end)) && end >= charLimit - 10) {
      end--;
    }
    return `${text.substring(0, end)}...`;
  } else return text;
};

const Placeholder = () => (
  <View
    style={{
      width: '100%',
      flex: 1,
      height: Dimensions.get('window').width,
      marginTop: 3,
    }}
  />
);

export const ViewportAwareVideo = Viewport.Aware(
  Viewport.WithPlaceholder(Video, Placeholder)
);

// Add more above this line...
