import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;
export default {
  feedContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  searchIcon: {
    marginRight: 20
  },
  container: {
    justifyContent: "center",
    paddingBottom: 2
  },
  orgTitleView: {
    fontFamily: "OpenSans-Regular",
    fontSize: 17,
    paddingLeft: 0
  },
  campImgContain: {
    /* Must have a Width && Height or it won't display anything! */
    flex: 1,
    height: deviceWidth,
    width: deviceWidth,
    marginTop: 2
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
    marginRight: 15,
    marginBottom: 15
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
  comments: {
    fontFamily: "OpenSans-Regular",
    fontSize: 13,
    lineHeight: 16,
    marginLeft: 15,
    paddingTop: 12,
    color: "#7B7D88"
  },
  readMore: {
    color: "#929292"
  },
  timeText: {
    color: "#929292",
    fontSize: 10,
    marginLeft: 15,
    marginTop: 15,
    paddingBottom: 8
  },
  demarcation: {
    marginTop: 15,
    borderTopWidth: 2,
    borderTopColor: "#eee"
  }
};
