import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;

export default {
  container: {
    justifyContent: "center",
    paddingBottom: 2
  },
  orgTitleView: {
    fontFamily: "OpenSans-Regular",
    fontSize: 17
  },
  updateBar: {
    backgroundColor: "rgba(202, 255, 0, 0.5)",
    height: 37,
    width: "100%",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  updateBarText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 18,
    color: "black"
  },
  campImgContain: {
    /* Must have a Width && Height or it won't display anything! */
    flex: 1,
    height: deviceWidth,
    width: deviceWidth
  },
  goToCampaignButton: {
    backgroundColor: "rgba(0, 255, 157, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    height: 37,
    position: "absolute",
    bottom: 0,
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
  campDescName: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 16,
    paddingBottom: 10
  },
  campDescText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    lineHeight: 19
  },
  readMore: {
    color: "#929292"
  },
  timeText: {
    color: "#929292",
    fontSize: 10,
    marginLeft: 15,
    marginTop: 15,
    paddingBottom: 3
  },
  demarcation: {
    height: 4,
    width: "100%",
    backgroundColor: "#fff"
  }
};
