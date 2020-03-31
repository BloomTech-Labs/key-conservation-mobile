import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, Image, View } from 'react-native';

import { Picker, PickerModal } from 'react-native-slack-emoji';

export default class Emoji extends Component {
  state = {
    emojiList: []
  };

  onSelect = (emoji, emojiName, data) => {};

  updateEmoji = (emoji, name) => {};

  render() {
    const { emojiList } = this.state;
    return (
      <View style={styles.container}>
        <Picker
          emojiList={emojiList}
          updateEmoji={this.updateEmoji}
          onSelect={this.onSelect}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    paddingTop: 70
  }
});
