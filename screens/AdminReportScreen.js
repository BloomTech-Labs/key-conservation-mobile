<<<<<<< HEAD
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
=======
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { getReports } from "../store/actions";
import { connect } from "react-redux";
import ReportCard from "../components/Reports/ReportCard";

const AdminReportScreen = props => {
  const [currentTab, setCurrentTab] = useState(0);
  const TABS = ["All", "Users", "Campaigns", "Comments"];

  const init = () => {
    props.getReports();
  };
  useEffect(init, []);

  const reports = props.reports.data?.reports.filter(report => {
    switch(currentTab) {
      case 1: return report.table_name === 'users';
      case 2: return report.table_name === 'campaigns' || report.table_name === 'campaignUpdates';
      case 3: return report.table_name === 'comments';
      default: return true;
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Current Reports</Text>
        <View style={styles.tabSelector}>
          {TABS.map((tabTitle, index) => (
            <TouchableOpacity onPress={() => setCurrentTab(index)} key={index} style={[styles.tab, {flex: tabTitle.length}]}>
              <Text style={styles.tabText}>{tabTitle}</Text>
              {index === currentTab && <View style={styles.selectedTab}></View>}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.reportList}>
          <FlatList 
            data={reports}
            renderItem={report => <ReportCard {...report.item} />}
            keyExtractor={item => item.id}
          />
        </View>
>>>>>>> 07eb4662850f024616db3a8e3f6269e3ea1f475c
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    marginHorizontal: 8
  },
  section: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    margin: 8,
  },
  tabSelector: {
    width: '100%',
    flexDirection: "row",
    height: 32,
    alignItems: "center",
    justifyContent: "space-between"
  },
  tab: {
    flex: 1,
    height: '100%',
    alignItems: "center",
  },
  tabText: {
    flex: 1,
    letterSpacing: 0.7,
    fontSize: 17
  },  
  reportList: {
    flex: 1,
    padding: 12,
    flexDirection: "column"
  },
<<<<<<< HEAD
  reportCard: {
    flexDirection: 'row',
    height: 48
=======
  selectedTab: {
    width: '100%',
    backgroundColor: '#00FF9D',
    height: 3
>>>>>>> 07eb4662850f024616db3a8e3f6269e3ea1f475c
  }
});
const mapStateToProps = state => ({
  reports: state.reports
});

export default connect(mapStateToProps, { getReports })(AdminReportScreen);
