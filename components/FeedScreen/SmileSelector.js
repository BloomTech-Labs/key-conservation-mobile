import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Dimensions,
} from 'react-native';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';
import PlusSignCircle from '../../assets/jsicons/PlusSignCircle';

const SmileSelector = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [emoji, setEmoji] = useState([]);
  console.log(emoji, 'emoji!');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayedEmojiWrapper}>
        <TouchableOpacity
          onPress={() => {
            setIsVisible(!isVisible);
          }}
        >
          <PlusSignCircle />
        </TouchableOpacity>

        <View style={styles.display}>
          {emoji.map((e, i) => {
            if (i < 8) {
              return (
                <Text
                  key={i}
                  style={{ fontSize: 20, backgroundColor: 'transparent' }}
                >
                  {e}
                </Text>
              );
            }
          })}
        </View>
      </View>

      <View>
        {isVisible && (
          <EmojiSelector
            category={Categories.emotion}
            onEmojiSelected={(e) => setEmoji([...emoji, e])}
            placeholder="Search..."
            showHistory={true}
            columns={8}
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width - 30,
  },
  display: {
    flexWrap: 'wrap',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  displayedEmojiWrapper: {
    flexDirection: 'row',
  },
});

export default SmileSelector;
