import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Plus from '../../assets/jsicons/Plus';

import { Picker, PickerModal } from 'react-native-slack-emoji';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    paddingTop: 70
  },
  profileWrapper: {
    flex: 1
  }
});

export default class App extends Component {
  state = {
    emojiList: []
  };

  onSelect = (emoji, emojiName, data) => {
    const { emojiList } = this.state;
    const newList = [...emojiList];
    const objIndex = newList.findIndex(e => e.name === emojiName);
    if (objIndex === -1) {
      newList.push({
        emoji,
        name: emojiName,
        data,
        index: 1
      });
    } else {
      newList[objIndex].index += 1;
    }
    this.setState({ emojiList: newList });
  };

  updateEmoji = (emoji, name) => {
    const { emojiList } = this.state;
    const newList = [...emojiList];
    const objIndex = newList.findIndex(e => e.name === name);
    newList[objIndex].index += 1;
    this.setState({ emojiList: newList });
  };

  render() {
    const { emojiList } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.comments}>
            <Picker
              emojiList={emojiList}
              updateEmoji={this.updateEmoji}
              onSelect={this.onSelect}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
