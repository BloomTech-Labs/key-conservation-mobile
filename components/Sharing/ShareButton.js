import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text
} from 'react-native';

import Popover from 'react-native-popover-view';
import SharingDialog from './SharingDialog';
import { Ionicons } from '@expo/vector-icons';

class ShareButton extends Component {
  state = {
    isVisible: false
  };

  showPopover() {
    this.setState({ isVisible: true });
  }

  closePopover() {
    this.setState({ isVisible: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          ref={ref => (this.touchable = ref)}
          onPress={() => this.showPopover()}
        >
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-share' : 'md-share'}
            size={30}
          />
        </TouchableOpacity>
        <Popover
          isVisible={this.state.isVisible}
          fromView={this.touchable}
          onRequestClose={() => this.closePopover()}
        >
          <SharingDialog
            data={this.props.data}
            navigation={this.props.navigation}
            onClose={() => this.closePopover()}
          />
        </Popover>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  }
});
export default ShareButton;
