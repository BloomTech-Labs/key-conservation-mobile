//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';

import styles, { DEVICE_WIDTH } from '../constants/screens/ReportDetailScreen';
import { ScrollView } from 'react-native-gesture-handler';

import { connect } from 'react-redux';

import { getReport } from '../store/actions';

// create a component
class ReportDetailScreen extends Component {
  left = new Animated.Value(DEVICE_WIDTH);

  openAnim = Animated.spring(this.left, { toValue: 0 });
  closeAnim = Animated.spring(this.left, { toValue: DEVICE_WIDTH });
  state = {
    currentReport: null
  };
  componentDidUpdate() {
    if (this.props.report) {
      // Animate IN
      this.closeAnim.stop();
      this.openAnim.start();
      if (!this.state.currentReport) {
        if (
          this.props.currentReport &&
          this.props.currentReport.id === this.props.currentReport.id
        ) {
          this.setState({ currentReport: this.props.currentReport });
        } else this.props.getReport(this.props.report.id);
      }
    } else {
      this.openAnim.stop();
      this.closeAnim.start();
      if (this.state.currentReport) {
        this.setState({ currentReport: null });
      }
    }
  }

  render() {
    console.log(this.state.currentReport);
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
              <Text style={styles.user_detail}>
                {1 + this.state.currentReport?.other_reports?.length} ACTIVE
                REPORTS
              </Text>
              <Text style={styles.user_detail}>
                This user has {this.props.currentUserProfile?.strikes} strikes
              </Text>
            </View>
          </View>
          <View style={styles.report_details}>
            {this.currentReport?.table_name === 'users' ? null : (
              <View style={styles.detail_section}>
                <Text style={styles.mini_header}>REPORT DETAILS</Text>
                <View style={styles.detail_field}>
                  <Text style={styles.text_label}>Description</Text>
                  <Text style={styles.report_desc}>
                    {this.state.currentReport?.report_desc}
                  </Text>
                </View>
                <View style={styles.detail_field}>
                  <Text style={styles.text_label}>Reported By</Text>
                  <TouchableOpacity style={styles.touch_op}>
                    <Text style={styles.text_label}>User</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.time_stamp}>
                  Reported on{' '}
                  {moment(this.state.currentReport?.reported_at).format('lll')}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </Animated.View>
    );
  }
}

const mapStateToProps = state => ({
  currentReport: state.reports.currentReport,
  currentUserProfile: state.currentUserProfile
});

export default connect(mapStateToProps, { getReport })(ReportDetailScreen);
