import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;

export default {
  demarcation: {
    marginTop: 15,
    borderTopWidth: 2,
    borderTopColor: "#eee"
  },
  container: {
    justifyContent: "center",
    paddingBottom: 2
  },
  orgTitleView: {
    fontFamily: "OpenSans-Regular",
    fontSize: 17
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
    marginTop: 15,
    paddingBottom: 3
  },
  readMore: {
    color: "#929292"
  },
  updateBar: {
    backgroundColor: "rgba(202, 255, 0, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    height: 37,
    width: "100%",
    marginTop: 2
  },
  updateBarText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 18,
    color: "black"
  }
};
