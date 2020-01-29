import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { getReports } from "../store/actions";
import { connect } from "react-redux";
import arrowIcon from "../assets/icons/chevron-left-solid.svg";

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
          let type;
          console.log(report.table_name);
          switch (report.table_name) {
            case "campaignUpdates":
              type = "Campaign Reported";
              break;
            case "campaigns":
              type = "Campaign Reported";
              break;
            case "comments":
              type = "Comment Reported";
              break;
            case "users":
              type = "User Reported";
              break;

            default:
              type = report.table_name;
          }

          return (
            <View style={styles.reportCard} key={report.id}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: report.image }}
                  style={styles.image}
                ></Image>
              </View>
              <View style={styles.reportInfo}>
                <Text style={styles.reportName}>{report.name}</Text>
                <Text style={styles.reportType}>{type.toUpperCase()}</Text>
              </View>
              <View style={styles.reportCount}></View>
              <View style={styles.arrowContainer}>
                <Image style={styles.arrowIcon} source={arrowIcon}></Image>
              </View>
            </View>
          );
        })}
      </View>
      <View style={styles.section}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(242,242,251)"
  },
  section: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    margin: 8,
    padding: 8
  },
  reportCard: {
    flex: 1,
    flexDirection: "row",
    height: 48,
    alignItems: "center"
  },
  imageContainer: {
    height: 48,
    width: 48
  },
  image: {
    flex: 1,
    borderRadius: 40,
    height: null,
    width: null
  },
  reportInfo: {
    marginHorizontal: 6
  },
  reportName: {
    fontSize: 16
  },
  reportType: {
    fontSize: 12,
    color: "grey"
  },
  reportCount: {},
  arrowContainer: {
    width: "10%",
    borderWidth: 1,
    height: "100%"
  },
  arrowIcon: {
    width: null,
    height: null,
    color: "black"

  }
});
const mapStateToProps = state => ({
  reports: state.reports
});

export default connect(mapStateToProps, { getReports })(AdminReportScreen);
