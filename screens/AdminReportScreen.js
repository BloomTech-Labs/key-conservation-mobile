import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { getReports } from "../store/actions";
import { connect } from "react-redux";
import ReportCard from "../components/Reports/ReportCard";

const AdminReportScreen = props => {
  const init = () => {
    props.getReports();
  };
  useEffect(init, []);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text>Current Reports</Text>

        {props.reports.data?.reports.map(report => {
          return <ReportCard {...report} key={report.id}/>
        })}
      </View>
      <View style={styles.section}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(242,242,251)",
  },
  section: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    margin: 8,
    padding: 8
  }
});
const mapStateToProps = state => ({
  reports: state.reports
});

export default connect(mapStateToProps, { getReports })(AdminReportScreen);
