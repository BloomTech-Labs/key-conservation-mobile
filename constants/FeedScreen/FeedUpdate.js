import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;

export default {
  demarcation: {
    height: 4,
    width: "100%",
    backgroundColor: "#fff"
  },
  container: {
    justifyContent: "center",
    paddingBottom: 35
  },
  orgTitleView: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 16,
    fontWeight: "bold"
  },
  campImgContain: {
    /* Must have a Width && Height or it won't display anything! */
    flex: 1,
    height: deviceWidth,
    width: deviceWidth
  },
  goToCampaignButton: {
    backgroundColor: "#00FF9D",
    alignItems: "center",
    justifyContent: "center",
    height: 37,
    width: "100%"
  },
  goToCampaignText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 18
  },
  campDesc: {
    marginLeft: 15,
    paddingTop: 15,
    marginRight: 15
  },
  campDescText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    lineHeight: 19
  },
  campDescName: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 16,
    paddingBottom: 10
  },
  timeText: {
    color: "#929292",
    fontSize: 10,
    marginLeft: 15,
    marginTop: 10
  },
  readMore: {
    color: "#929292"
  },
  updateBar: {
    backgroundColor: "#CAFF00",
    alignItems: "center",
    justifyContent: "center",
    height: 37,
    width: "100%"
  },
  updateBarText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 18,
    color: "black"
  }
};
