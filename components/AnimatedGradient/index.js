import React, { Component } from 'react';
import { Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

class AnimatedGradient extends Component {
  render() {
    const {
      style,
      color1,
      color2,
      start = { x: 0.5, y: 0 },
      end = { x: 0.5, y: 1 },
    } = this.props;

    return (
      <LinearGradient
        colors={[color1, color2]}
        start={start}
        end={end}
        style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}
      />
    );
  }
}

export default Animated.createAnimatedComponent(AnimatedGradient);
