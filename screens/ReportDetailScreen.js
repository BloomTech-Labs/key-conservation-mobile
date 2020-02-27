//import liraries
import React, { Component } from 'react';
import { View, Text, Image, Alert } from 'react-native';

import styles from '../constants/screens/ReportDetailScreen';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { connect } from 'react-redux';

import { deactivateUser, getProfileData } from '../store/actions';
import ReportDetailCard from '../components/Reports/ReportDetailCard';

import BackButton from '../components/BackButton';
import LoadingOverlay from '../components/LoadingOverlay';

import ChevronLeft from '../assets/jsicons/miscIcons/ChevronLeftWhite';

class ReportDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Report Details',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerLeft: () => <BackButton navigation={navigation} />
    };
  };

  state = {
    currentUser: null
  };

  componentDidUpdate() {
    if (
      this.props.currentReport &&
      !this.state.currentUser &&
      !this.props.loading
    ) {
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
    }
  }

  deactivateUser = () => {
    this.props.deactivateUser(this.state.currentUser.id).then(error => {
      if (error) Alert.alert(error);
      else {
        this.props.navigation.goBack(null);
      }
    });
  };

  promptDeactivate = () => {
    Alert.alert(
      'Deactivate User',
      `Are you sure you want to deactivate this user? This will also archive all their current reports`,
      [
        {
          text: 'Deactivate',
          style: 'destructive',
          onPress: this.deactivateUser
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  goToProfile = id => {
    if (!id) return;

    this.props.navigation.navigate('ProDetails', {
      selectedProfile: id
    })
  };

  render() {
    return (
      <View style={[styles.container, { left: this.left }]}>
        <LoadingOverlay loading={this.props.loading} />
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity
            style={styles.user_info}
            disabled={!this.state.currentUser}
            onPress={this.goToProfile.bind(this, this.state.currentUser?.id)}
          >
            <View style={styles.user_image_container}>
              <Image
                style={styles.user_image}
                source={{
                  uri: this.state.currentUser?.profile_image
                }}
              />
            </View>
            <View style={styles.user_details}>
              <Text style={styles.user_name}>
                {this.state.currentUser?.username || '---'}
              </Text>
              <Text style={styles.user_detail}>
                {1 +
                  this.props.currentReport?.other_reports?.filter(
                    r => !r.is_archived
                  ).length || '---'}{' '}
                ACTIVE REPORTS
              </Text>
              <Text style={styles.user_detail}>
                This user has {this.state.currentUser?.strikes || '0'} strikes
              </Text>
            </View>
            <View style={styles.arrow_icon_container}>
              <ChevronLeft fill='#000' width='20' height='20' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deactivate_btn_container}
            onPress={this.promptDeactivate}
            disabled={!this.state.currentUser}
          >
            <Text style={styles.deactivate_btn}>Deactivate this user</Text>
          </TouchableOpacity>
          <View style={styles.reports}>
            {this.props.currentReport && !this.props.loading && (
              <ReportDetailCard
                goToProfile={this.goToProfile}
                navigation={this.props.navigation}
                currentReport={this.props.currentReport}
                unique_reports={this.props.currentReport?.unique_reports}
              />
            )}
            {this.props.currentReport?.other_reports.length &&
            !this.props.loading ? (
              <View style={styles.other_reports_section}>
                <Text style={styles.other_section_header}>
                  Other reports on this user
                </Text>
                {this.props.currentReport?.other_reports.map(report => {
                  return (
                    <ReportDetailCard
                      goToProfile={this.goToProfile}
                      navigation={this.props.navigation}
                      unique_reports={report.unique_reports}
                      currentReport={report}
                      collapsed={true}
                      key={report.id}
                    />
                  );
                })}
              </View>
            ) : null}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.reports.loading || state.pending.getProfile,
  currentReport: state.reports.currentReport,
  currentUserProfile: state.currentUserProfile
});

export default connect(mapStateToProps, {
  deactivateUser,
  getProfileData
})(ReportDetailScreen);
