import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getReports } from '../store/actions';
import { connect } from 'react-redux';

const AdminReportScreen = props => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text>Current Reports</Text>

        {reports.map(report => {
          <View style={styles.reportCard} key={report.id}>
            {r}
          </View>;
        })}
      </View>
      <View style={styles.section}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(242,242,251)'
  },
  section: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 4
  },
  reportCard: {
    flexDirection: row,
    height: 48
  }
});
const mapStateToProps = state => ({
  reports: state.reports
});

export default connect(mapStateToProps, { getReports })(AdminReportScreen);
