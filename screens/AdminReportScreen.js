import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getReports } from '../store/actions';
import { connect } from 'react-redux';

const AdminReportScreen = props => {
  const init = () => {
    props.getReports();
  };

  useEffect(init, []);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text>Current Reports</Text>

        {props.reports.loading ? (
          <Text>'Loading reports...'</Text>
        ) : props.reports.error ? (
          <Text>{props.reports.error}</Text>
        ) : (
          <View>
            {props.reports.data?.reports?.map(report => {
              return <Text>{report.table_name}</Text>;
              //   <View style={styles.reportCard} key={report.id}>
              //       <View>
              //           <Image style={styles.image} source={}/>
              //       </View>
              //       <View></View>
              //       <View></View>
              //       <View></View>
              //   </View>;
            })}
          </View>
        )}
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
    flexDirection: 'row',
    height: 48
  }
});
const mapStateToProps = state => ({
  reports: state.reports
});

export default connect(mapStateToProps, { getReports })(AdminReportScreen);
