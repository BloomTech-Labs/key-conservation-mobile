//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';

import styles, { DEVICE_WIDTH } from '../constants/screens/ReportDetailScreen';
import { ScrollView } from 'react-native-gesture-handler';

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
        <ScrollView>
          <View style={styles.user_info}>
            <View style={styles.user_image_container}>
              <Image
                style={styles.user_image}
                source={{
                  uri: this.props.report?.image
                }}
              />
            </View>
            <View style={styles.user_details}>
              <Text style={styles.user_name}>{this.props.report?.name}</Text>
              <Text style={styles.user_detail}># ACTIVE REPORTS</Text>
              <Text style={styles.user_detail}>This user has 0 strikes</Text>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    );
  }
}

//make this component available to the app
export default ReportDetailScreen;
