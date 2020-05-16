import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import AnimatedGradient from '../AnimatedGradient';

import styles from '../../constants/CampaignPost';

export default class FeedLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };

    this.animationValue = new Animated.Value(0);

    this._anim = Animated.timing(this.animationValue, {
      toValue: 1,
      duration: 720,
    });

    this.animation = Animated.loop(this._anim);
  }

  componentDidMount() {
    this.animation.start();
  }

  componentDidUpdate() {
    if (this.state.show !== this.props.loading) {
      this.setState({ show: this.props.loading });

      if (this.props.loading) {
        this.animation.start();
      } else {
        this.animation.stop();
      }
    }
  }

  render() {
    const color1 = this.animationValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['#FFF', '#AAA', '#FFF'],
    });

    const color2 = this.animationValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['#AAA', '#FFF', '#9F9F9F'],
    });

    return (
      <Animated.View
        style={[
          {
            flex: 1,
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
          },
          { opacity: this.props.loading ? 1 : 0 },
        ]}
        pointerEvents={this.state.show ? 'auto' : 'none'}
      >
        {[0, 1].map((_, i) => (
          <View
            key={i}
            style={{
              ...styles.container,
              height: 640,
              paddingTop: 0,
              paddingBottom: 0,
              padding: 0,
              marginBottom: 16,
            }}
          >
            <AnimatedGradient
              color1={color1}
              color2={color2}
              style={{ flex: 1, zIndex: 99 }}
            />
          </View>
        ))}
      </Animated.View>
    );
  }
}
