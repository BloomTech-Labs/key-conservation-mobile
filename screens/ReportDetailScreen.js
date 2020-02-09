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

class ReportDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Report Details',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center'
      },
      headerLeft: () => (
        <BackButton navigation={navigation} />
      )
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
    this.props
      .deactivateUser(this.state.currentUser.id)
      .then(error => {
        if(error)
          Alert.alert(error);
        else {
          this.props.navigation.goBack(null);
        }
      })
  }

  promptDeactivate =() => {
    Alert.alert(
      'Deactivate User',
      `Are you sure you want to deactivate this user? This will also archive all their current reports`,
      [
        {
          text: 'Deactivate',
          style: 'destructive',
          onPress: this.deactivateUser
        },
        { text: 'Cancel' }
      ]
    )
  }

  render() {
    return (
      <View style={[styles.container, { left: this.left }]}>
        <LoadingOverlay loading={this.props.loading} />
        <ScrollView style={styles.scrollView}>
          <View style={styles.user_info}>
            <View style={styles.user_image_container}>
              <Image
                style={styles.user_image}
                source={{
                  uri: this.state.currentUser?.profile_image
                }}
              />
            </View>
            <View style={styles.user_details}>
              <Text style={styles.user_name}>{this.state.currentUser?.username || '---'}</Text>
              <Text style={styles.user_detail}>
                {1 + this.props.currentReport?.other_reports?.length || '---'}{' '}
                ACTIVE REPORTS
              </Text>
              <Text style={styles.user_detail}>
                This user has {this.state.currentUser?.strikes || '0'} strikes
              </Text>
              <TouchableOpacity
                style={styles.deactivate_btn_container}
                onPress={this.promptDeactivate}
                disabled={!this.state.currentUser}
              >
                <Text style={styles.deactivate_btn}>Deactivate this user</Text>
              </TouchableOpacity>
            </View>
          </View>
          {this.props.currentReport && !this.props.loading && (
            <ReportDetailCard
              navigation={this.props.navigation}
              currentReport={this.props.currentReport}
              unique_reports={this.props.currentReport?.unique_reports}
            />
          )}
          {this.props.currentReport?.other_reports.length && !this.props.loading ? (
            <View style={styles.other_reports_section}>
              <Text style={styles.other_section_header}>
                Other reports on this user
              </Text>
              {this.props.currentReport?.other_reports.map(report => {
                return (
                  <ReportDetailCard
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
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.reports.loading,
  currentReport: state.reports.currentReport,
  currentUserProfile: state.currentUserProfile
});

export default connect(mapStateToProps, {
  deactivateUser,
  getProfileData
})(ReportDetailScreen);
