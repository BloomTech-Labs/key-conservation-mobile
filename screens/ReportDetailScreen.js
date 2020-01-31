//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Animated, Image } from "react-native";

import styles, { DEVICE_WIDTH } from "../constants/screens/ReportDetailScreen";

// create a component
class ReportDetailScreen extends Component {
  left = new Animated.Value(DEVICE_WIDTH);

  openAnim = Animated.spring(this.left, { toValue: 0 });
  closeAnim = Animated.spring(this.left, { toValue: DEVICE_WIDTH });

  componentDidUpdate() {
    if (this.props.report) {
      // Animate IN
      this.closeAnim.stop();
      this.openAnim.start();
    } else {
      this.openAnim.stop();
      this.closeAnim.start();
    }
  }

  render() {
    return (
      <Animated.View style={[styles.container, { left: this.left }]}>
        
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: this.props.report?.image
          }}
        />
        <Text>ReportDetailScreen</Text>
      </Animated.View>
    );
  }
}

//make this component available to the app
export default ReportDetailScreen;
