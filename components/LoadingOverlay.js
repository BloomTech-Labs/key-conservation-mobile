//import liraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
export default class LoadingOverlay extends React.Component {
  render() {
    return (
      <View
        pointerEvents={this.props.loading ? 'auto' : 'none'}
        style={{
          ...styles.load_overlay,
          opacity: this.props.loading ? 0.7 : 0
        }}
      >
        <Text style={styles.load_text}>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  load_overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100
  },
  load_text: {
    fontWeight: 'bold',
    color: 'white'
  }
});
