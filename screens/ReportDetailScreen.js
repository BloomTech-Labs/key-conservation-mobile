//import liraries
import React, { Component } from 'react';
import { View, Text, Animated, Image, Button, Alert } from 'react-native';

import styles, { DEVICE_WIDTH } from '../constants/screens/ReportDetailScreen';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { connect } from 'react-redux';

import { getReport, deactivateUser, getProfileData } from '../store/actions';
import ReportDetailCard from '../components/Reports/ReportDetailCard';

// create a component
class ReportDetailScreen extends Component {
  left = new Animated.Value(DEVICE_WIDTH);

  openAnim = Animated.spring(this.left, { toValue: 0 });
  closeAnim = Animated.spring(this.left, { toValue: DEVICE_WIDTH });
  state = {
    currentReport: null,
    currentUser: null
  };
  componentDidUpdate() {
    if (this.props.report) {
      // Animate IN
      this.closeAnim.stop();
      this.openAnim.start();
      if (!this.state.currentReport) {
        if (
          this.props.currentReport &&
          this.props.currentReport.id === this.props.report.id
        ) {
          this.setState({ currentReport: this.props.currentReport });
          this.props
            .getProfileData(
              this.props.currentReport.reported_user,
              null,
              false,
              true
            )
            .then(res => {
              this.setState({ currentUser: res });
            });
        } else {
          this.props.getReport(this.props.report.id);
        }
      }
    } else {
      this.openAnim.stop();
      this.closeAnim.start();
      if (this.state.currentReport) {
        this.setState({ currentReport: null, currentUser: null });
      }
    }
  }

  deactivateUser() {
    this.props
      .deactivateUser(this.state.currentReport?.reported_user)
      .then(res => {
        console.log('Deactivated successfully');
        // TODO on backend: archive all reports
        // that are related to this user
      })
      .catch(err => {
        Alert.alert(err.error);
      });
  }

  promptDeactivate() {
    Alert.alert(
      'Deactivate User',
      'Are you sure you want to deactivate this user?',
      [
        {
          text: 'Deactivate',
          style: 'destructive',
          onPress: this.deactivateUser
        },
        { text: 'Cancel' }
      ]
    );
  }

  render() {
    return (
      <Animated.View style={[styles.container, { left: this.left }]}>
        {this.props.loading && (
          <View style={styles.load_overlay}>
            <Text style={styles.load_text}>Loading...</Text>
          </View>
        )}
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
                {1 + this.state.currentReport?.other_reports?.length || '---'} ACTIVE
                REPORTS
              </Text>
              <Text style={styles.user_detail}>
                This user has {this.state.currentUser?.strikes || '0'} strikes
              </Text>
              <TouchableOpacity
                style={styles.deactivate_btn_container}
                onPress={this.promptDeactivate}
              >
                <Text style={styles.deactivate_btn}>Deactivate this user</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ReportDetailCard currentReport={this.state.currentReport} />
          {this.state.currentReport?.other_reports.length ? (
            <View style={styles.other_reports_section}>
              <Text style={styles.other_section_header}>
                Other reports on this user
              </Text>
              {this.state.currentReport?.other_reports.map(report => {
                return (
                  <ReportDetailCard
                    currentReport={report}
                    collapsed={true}
                    key={report.id}
                  />
                );
              })}
            </View>
          ) : null}
        </ScrollView>
      </Animated.View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.reports.loading,
  currentReport: state.reports.currentReport,
  currentUserProfile: state.currentUserProfile
});

export default connect(mapStateToProps, {
  getReport,
  deactivateUser,
  getProfileData
})(ReportDetailScreen);
