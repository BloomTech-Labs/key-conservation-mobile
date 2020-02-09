import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Button } from 'react-native';
import { getReports, getReport } from '../store/actions';
import { connect } from 'react-redux';
import ReportCard from '../components/Reports/ReportCard';

import styles from '../constants/screens/AdminReportScreen';
import BackButton from '../components/BackButton';
import LoadingOverlay from '../components/LoadingOverlay';

class AdminReportScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Manage Reports',
      headerStyle: {
        backgroundColor: '#323338'
      },
      headerTintColor: '#fff',
      headerLeft: () => <BackButton navigation={navigation} />
    };
  };

  constructor(props) {
    super(props);
    this.MASTER_TABS = ['Active', 'Archived'];
    this.TABS = ['All', 'Users', 'Campaigns', 'Comments'];
  }

  state = {
    masterTab: 0,
    currentTab: 0,
    currentPage: 0
  };

  nextPage = () => {
    if (this.state.currentPage < this.props.reports.data.pages - 1) {
      this.updateReports(this.state.currentPage + 1);
      this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
    }
  };

  prevPage = () => {
    if (this.state.currentPage > 0) {
      this.updateReports(this.state.currentPage - 1);
      this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
    }
  };

  componentDidMount() {
    this.props.getReports();
  }

  openReport = report => {
    this.props.getReport(report.id);
    this.props.navigation.navigate('ReportScreen');
  };

  getReportType = () => {
    switch (this.state.currentTab) {
      case 0:
        return 'all';
      case 1:
        return 'users';
      case 2:
        return 'campaigns';
      case 3:
        return 'comments';
      default:
        return 'all';
    }
  };

  setMasterTab = tab => {
    this.setState({ masterTab: tab, currentTab: 0, currentPage: 0 }, () => {
      this.updateReports(this.state.currentPage);
    });
  };

  setCurrentTab = tab => {
    this.setState({ currentTab: tab, currentPage: 0 }, () => {
      this.updateReports(this.state.currentPage);
    });
  };

  updateReports = pageNum => {
    this.props.getReports(
      pageNum,
      this.getReportType(),
      this.state.masterTab === 1
    );
  };

  render() {
    const reports = this.props.reports.data?.reports;

    return (
      <View style={styles.container}>
        <LoadingOverlay loading={this.props.reports.loading} />
        <View style={styles.section}>
          <View style={styles.tabSelector}>
            {this.MASTER_TABS.map((tabTitle, index) => (
              <TouchableOpacity
                onPress={() => this.setMasterTab(index)}
                key={index}
                style={[styles.tab, { flex: tabTitle.length }]}
              >
                <Text style={styles.tabText}>{tabTitle}</Text>
                {index === this.state.masterTab ? (
                  <View style={styles.selectedTab}></View>
                ) : null}
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.title}>{this.state.masterTab === 0 ? "Active Reports" : "Archived Reports"}</Text>
          <View style={{ flex: 1 }}>
            <View style={styles.tabSelector}>
              {this.TABS.map((tabTitle, index) => (
                <TouchableOpacity
                  onPress={() => this.setCurrentTab(index)}
                  key={index}
                  style={[styles.tab, { flex: tabTitle.length }]}
                >
                  <Text style={styles.tabText}>{tabTitle}</Text>
                  {index === this.state.currentTab ? (
                    <View style={styles.selectedTab}></View>
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>
            {this.props.reports.error || reports?.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {reports?.length === 0 ? (
                  <Text>No reports to see here!</Text>
                ) : (
                  <Text style={{ color: 'crimson' }}>
                    {this.props.reports.error}
                  </Text>
                )}
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
                <View style={styles.pageSelector}>
                  <View style={styles.pageControl}>
                    {this.props.reports.data?.pages &&
                    this.state.currentPage > 0 ? (
                      <Button
                        title='Previous'
                        onPress={this.prevPage}
                        disabled={this.props.reports.loading}
                      />
                    ) : null}
                  </View>
                  <Text style={styles.pageNumber}>{`Page ${this.state
                    .currentPage + 1 || '-'} of ${this.props.reports.data
                    ?.pages || '-'}`}</Text>
                  <View style={styles.pageControl}>
                    {this.props.reports.data?.pages &&
                    this.state.currentPage <
                      this.props.reports.data?.pages - 1 ? (
                      <Button
                        title='Next'
                        onPress={this.nextPage}
                        disabled={this.props.reports.loading}
                      />
                    ) : null}
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  reports: state.reports
});

export default connect(mapStateToProps, { getReports, getReport })(
  AdminReportScreen
);
