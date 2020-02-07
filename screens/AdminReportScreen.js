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
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center'
      },
      headerLeft: () => <BackButton navigation={navigation} />
    };
  };

  constructor(props) {
    super(props);
    this.MASTER_TABS = ['Current', 'Archived'];
    this.TABS = ['All', 'Users', 'Campaigns', 'Comments'];
  }

  state = {
    masterTab: 0,
    currentTab: 0,
    currentPage: 0
  };

  nextPage = () => {
    if (this.state.currentPage < this.props.reports.data.pages - 1) {
      this.props.getReports(this.state.currentPage + 1);
      this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
    }
  };

  prevPage = () => {
    if (this.state.currentPage > 0) {
      this.props.getReports(this.state.currentPage - 1);
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
        <LoadingOverlay loading={this.props.reports.loading} />
        <View style={styles.section}>
          <View style={styles.tabSelector}>
            {this.MASTER_TABS.map((tabTitle, index) => (
              <TouchableOpacity
                onPress={() => this.setState({ masterTab: index })}
                key={index}
                style={[styles.tab, { flex: tabTitle.length }]}
              >
                <Text style={styles.tabText}>{tabTitle}</Text>
                {index === this.state.masterTab && (
                  <View style={styles.selectedTab}></View>
                )}
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.title}>Current Reports</Text>
          <View style={{ flex: 1 }}>
            
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
                <View style={styles.pageSelector}>
                  <View style={styles.pageControl}>
                    {this.props.reports.data?.pages &&
                      this.state.currentPage > 0 && (
                        <Button
                          title='Previous'
                          onPress={this.prevPage}
                          disabled={this.props.reports.loading}
                        />
                      )}
                  </View>
                  <Text style={styles.pageNumber}>{`Page ${this.state
                    .currentPage + 1 || '-'} of ${this.props.reports.data
                    ?.pages || '-'}`}</Text>
                  <View style={styles.pageControl}>
                    {this.props.reports.data?.pages &&
                      this.state.currentPage <
                        this.props.reports.data?.pages - 1 && (
                        <Button
                          title='Next'
                          onPress={this.nextPage}
                          disabled={this.props.reports.loading}
                        />
                      )}
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
