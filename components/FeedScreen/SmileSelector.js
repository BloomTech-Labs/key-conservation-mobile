import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, SafeAreaView } from 'react-native';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';
import CheckMark from '../../assets/jsicons/miscIcons/CheckMark';

const SmileSelector = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setIsVisible(!isVisible);
        }}
      >
        <CheckMark />
      </TouchableOpacity>
      {isVisible && (
        <EmojiSelector
          category={Categories.emotion}
          onEmojiSelected={(emoji) => console.log(emoji)}
          placeholder="Search..."
          showHistory={true}
        />
      )}
    </View>
  );
};

export default SmileSelector;
