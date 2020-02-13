//import libraries
import React, { Component } from 'react';
import { View, Animated, TouchableWithoutFeedback, Image } from 'react-native';

import ChevronLeftWhite from '../assets/jsicons/miscIcons/ChevronLeftWhite';
import styles from '../constants/Collapsible2';

// create a component
class Collapsible2 extends Component {
  constructor(props) {
    super(props);

    const typeOfRight = typeof props.right;

    if (typeOfRight !== 'undefined' && typeOfRight !== 'object') {
      console.error(
        'Prop `right` in Collapsible must be a valid React component!'
      );
    }
  }

  state = {
    collapsed: this.props.collapsed || false,
    animation: new Animated.Value(),
    minHeight: 0,
    maxHeight: 0
  };

  ARROW_COLLAPSED = '180deg';
  ARROW_OPEN = '90deg';

  toggle = () => {
    const MAX = this.state.maxHeight + this.state.minHeight;
    let initialValue = this.state.collapsed ? this.state.minHeight : MAX,
      endValue = this.state.collapsed ? MAX : this.state.minHeight;

    this.state.animation.setValue(initialValue);
    Animated.spring(this.state.animation, {
      toValue: endValue
    }).start();

    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  };

  setMinHeight = event => {
    if (this.state.minHeight > 0) return;

    const min = event.nativeEvent.layout.height;

    if (this.state.collapsed) this.state.animation.setValue(min);

    this.setState({
      minHeight: min
    });
  };

  setMaxHeight = event => {
    if (this.state.maxHeight > 0) return;

    const max = event.nativeEvent.layout.height;

    this.setState({
      maxHeight: max
    });
  };

  getHeight = () => {
    const res = this.state.animation._value ? this.state.animation : null;
    return res;
  };

  render() {
    console.log(this.state.collapsed);
    let arrowRot = this.state.collapsed
      ? this.ARROW_COLLAPSED
      : this.ARROW_OPEN;

    if (this.state.minHeight && this.state.maxHeight) {
      arrowRot = this.state.animation.interpolate({
        inputRange: [
          this.state.minHeight,
          this.state.maxHeight + this.state.minHeight
        ],
        outputRange: [this.ARROW_COLLAPSED, this.ARROW_OPEN]
      });
    }

    return (
      <Animated.View style={[styles.container, { height: this.getHeight() }]}>
        <TouchableWithoutFeedback onPress={this.toggle}>
          <View
            style={styles.title_bar}
            onLayout={this.setMinHeight.bind(this)}
          >
            <Image
              source={this.props.image}
              style={styles.image}
              resizeMode='cover'
            />
            <View style={styles.right_content}>{this.props.right}</View>
            <Animated.View
              style={[
                styles.arrowContainer,
                { transform: [{ rotate: arrowRot }] }
              ]}
            >
              <ChevronLeftWhite style={styles.arrow} />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
        <View
          ref={ref => (this.content = ref)}
          style={[styles.content]}
          onLayout={this.setMaxHeight.bind(this)}
        >
          {this.props.children}
        </View>
      </Animated.View>
    );
  }
}

export default Collapsible2;
