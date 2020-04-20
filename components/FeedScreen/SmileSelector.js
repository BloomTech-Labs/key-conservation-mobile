import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  Text,
} from 'react-native';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';
import CheckMark from '../../assets/jsicons/miscIcons/CheckMark';

const SmileSelector = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [emoji, yesEmoji] = useState([]);
  console.log(emoji, 'emoji!');

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setIsVisible(!isVisible);
        }}
      >
        <CheckMark />
      </TouchableOpacity>

      <View style={styles.display}>
        {emoji.map((e, i) => {
          return (
            <Text
              key={i}
              style={{ fontSize: 64, backgroundColor: 'transparent' }}
            >
              {e}
            </Text>
          );
        })}
      </View>

      <View>
        {isVisible && (
          <EmojiSelector
            category={Categories.emotion}
            onEmojiSelected={(e) => yesEmoji([...emoji, e])}
            placeholder="Search..."
            showHistory={true}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  display: {
    flexWrap:'wrap', 
    margin: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default SmileSelector;
