import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { getReports } from '../store/actions';
import { connect } from 'react-redux';
import ReportCard from '../components/Reports/ReportCard';

import styles from '../constants/screens/AdminReportScreen';
import GoBackButton from '../components/GoBackButton';
import ReportDetailScreen from './ReportDetailScreen';

class AdminReportScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('reportTitle'),
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center'
      },
      headerLeft: (
        <GoBackButton pressAction={navigation.getParam('adminBack')} />
      )
    };
  };

  goBack = () => {
    if (this.state.currentReport) {
      this.setState({ currentReport: null });
    } else this.props.navigation.navigate('AccountSettings');
  };

  constructor(props) {
    super(props);
    this.TABS = ['All', 'Users', 'Campaigns', 'Comments'];
  }

  state = {
    currentTab: 0,
    currentReport: null
  };

  componentDidMount() {
    this.props.navigation.setParams({ reportTitle: 'Manage Reports' });
    this.props.navigation.setParams({ adminBack: this.goBack });
    this.props.getReports();
  }

  componentDidUpdate() {
    let targetTitle;
    if (this.state.currentReport) {
      targetTitle = this.state.currentReport.name;
      if (this.props.navigation.getParam('reportTitle') !== targetTitle)
        this.props.navigation.setParams({
          reportTitle: targetTitle
        });
    } else {
      targetTitle = 'Manage Reports';
      if (this.props.navigation.getParam('reportTitle') !== targetTitle)
        this.props.navigation.setParams({ reportTitle: targetTitle });
    }
  }

  openReport = report => {
    this.setState({ currentReport: report });
  };

  render() {
    const reports = this.props.reports.data?.reports.filter(report => {
      switch (this.state.currentTab) {
        case 1:
          return report.table_name === 'users';
        case 2:
          return (
            report.table_name === 'campaigns' ||
            report.table_name === 'campaignUpdates'
          );
        case 3:
          return report.table_name === 'comments';
        default:
          return true;
      }
    });

    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.title}>Current Reports</Text>
          <View style={styles.tabSelector}>
            {this.TABS.map((tabTitle, index) => (
              <TouchableOpacity
                onPress={() => this.setState({ currentTab: index })}
                key={index}
                style={[styles.tab, { flex: tabTitle.length }]}
              >
                <Text style={styles.tabText}>{tabTitle}</Text>
                {index === this.state.currentTab && (
                  <View style={styles.selectedTab}></View>
                )}
              </TouchableOpacity>
            ))}
          </View>
          {this.props.reports.error ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ color: 'crimson' }}>
                {this.props.reports.error}
              </Text>
            </View>
          ) : (
            <View style={styles.reportList}>
              <FlatList
                data={reports}
                renderItem={report => (
                  <TouchableOpacity
                    onPress={this.openReport.bind(this, report.item)}
                  >
                    <ReportCard {...report.item} />
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          )}
        </View>
        <View style={styles.section}></View>
        <ReportDetailScreen report={this.state.currentReport} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  reports: state.reports
});

export default connect(mapStateToProps, { getReports })(AdminReportScreen);
