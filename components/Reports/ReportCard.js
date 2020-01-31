import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import SvgUri from "react-native-svg-uri";

const ReportCard = props => {
  let type;
  switch (props.table_name) {
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
      type = props.table_name;
  }

  return (
    <View style={styles.reportCard}>
      <View style={styles.left}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: props.image }} style={styles.image}></Image>
        </View>
        <View style={styles.reportInfo}>
          <Text style={styles.reportName}>{props.name}</Text>
          <Text style={styles.reportType}>{type.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <View style={styles.reportCount}></View>
        <View style={styles.arrowContainer}>
          <SvgUri
            style={styles.arrowIcon}
            source={require("../../assets/icons/chevron-left-solid.svg")}
            fill={"#000000"}
            width="25"
            height="100%"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reportCard: {
    flex: 1,
    flexDirection: "row",
    height: 48,
    marginVertical: 4,
    alignItems: "center",
    justifyContent: "space-between"
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
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  arrowIcon: {
    transform: [{ rotateZ: "180deg" }],
    paddingVertical: 18
  },
  left: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  right: {
    justifyContent: "flex-end",
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  }
});

export default ReportCard;
