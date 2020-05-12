import React, { Component } from 'react';
import { Animated, Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('screen').width;

export default class NewPostsButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.animation = new Animated.Value(0);

    this.animateIn = Animated.timing(this.animation, {
      toValue: 1,
      duration: 200,
    });

    this.animateOut = Animated.timing(this.animation, {
      toValue: 0,
      duration: 200,
    });
  }

  componentDidUpdate() {
    if (this.props.show) {
      this.animateOut.stop();
      this.animateIn.start();
    } else if (!this.props.show) {
      this.animateIn.stop();
      this.animateOut.start();
    }
  }

  render() {
    const opacity = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const top = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 80],
    });

    return (
      <Animated.View
        style={[styles.container, { top, opacity }]}
        pointerEvents={this.props.show ? 'auto' : 'none'}
      >
        <TouchableOpacity
          containerStyle={styles.button}
          onPress={() => {
            this.props.onPress?.();
          }}
        >
          <Text style={styles.buttonText}>New Posts</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 80,
    left: SCREEN_WIDTH / 2 - 64,
    width: 128,
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: 'gray',
    shadowOffset: {
      height: 2,
      width: 2,
    },
    zIndex: 50,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Lato-Bold',
  },
});
