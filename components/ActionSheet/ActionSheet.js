import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import styles from '../../constants/ActionSheet/ActionSheet';
import { BlurView } from 'expo-blur';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';

export default class ActionSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.animation = new Animated.Value(0);

    this.open = Animated.spring(this.animation, {
      toValue: 1,
      useNativeDriver: true,
    });

    this.close = Animated.timing(this.animation, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    });
  }

  toggleActionSheet = () => {
    this.setState((prevState) => ({ open: !prevState.open }));
  };

  componentDidUpdate() {
    if (this.state.open) {
      this.open.start();
    } else {
      this.close.start();
    }
  }

  render() {
    const scale = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100],
    });

    const Button = this.props.button?.();

    return (
      <View
        style={styles.mainContainer}
        onStartShouldSetResponder={(evt) => {
          evt.persist();
          if (this.childrenIds && this.childrenIds.length) {
            if (this.childrenIds.includes(evt.target)) {
              return;
            }
            if (this.state.open) {
              this.setState({ open: false });
            }
          }
        }}
      >
        <TouchableOpacity onPress={this.toggleActionSheet}>
          {Button}
        </TouchableOpacity>
        <Animated.View
          style={{
            ...styles.container,
            transform: [{ scaleX: scale }, { scaleY: scale }],
          }}
        >
          <BlurView intensity={100} tint="light" style={styles.blur}>
            <View
              style={{ flex: 1 }}
              //   ref={(component) => {
              //       component.
              //     this.childrenIds = component._children.map(
              //       (el) => el._nativeTag
              //     );
              //   }}
            >
              <TouchableHighlight style={styles.button}>
                <Text style={styles.buttonLabel}>Button</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.button}>
                <Text style={styles.buttonLabel}>Button</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.button}>
                <Text style={styles.buttonLabel}>Button</Text>
              </TouchableHighlight>
            </View>
          </BlurView>
        </Animated.View>
      </View>
    );
  }
}
