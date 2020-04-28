import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
} from 'react-native';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';
import PlusSignCircle from '../../assets/jsicons/PlusSignCircle';

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
        <PlusSignCircle />
      </TouchableOpacity>

      <View style={styles.display}>
        {emoji.map((e, i) => {
          return (
            <Text
              key={i}
              style={{ fontSize: 20, backgroundColor: 'transparent' }}
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
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  display: {
    flexWrap: 'wrap',
    marginLeft: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    
  },
});

export default SmileSelector;
