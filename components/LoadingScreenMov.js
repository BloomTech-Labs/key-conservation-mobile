import React from 'react';
import { View } from 'react-native';
import { Video } from 'expo-av';

export default function LoadingScreenMov({ navigation }) {
  _onPlaybackStatusUpdate = playbackStatus => {
    if (playbackStatus.didJustFinish) {
      navigation.navigate('Loading');
    }
  };
  return (
    <View>
      <Video
        source={require('../assets/images/Key_Intro.mp4')}
        rate={1.0}
        volume={1.0}
        resizeMode='cover'
        shouldPlay
        didJustFinish
        playbackStatus
        style={{ width: '100%', height: '100%' }}
        onPlaybackStatusUpdate={playbackStatus =>
          _onPlaybackStatusUpdate(playbackStatus)
        }
      />
    </View>
  );
}
