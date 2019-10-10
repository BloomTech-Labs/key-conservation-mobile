import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;
export default {
  demarcation: {
    marginTop: 15,
    borderTopWidth: 2,
    borderTopColor: '#eee'
  },
  feedContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  searchIcon: {
    marginRight: 20
  },
  container: {
    justifyContent: "center",
    paddingBottom: 35
  },
  feedContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  searchIcon: {
    marginRight: 20
  },
  timeText: {
    color: "#929292",
    fontSize: 10,
    marginLeft: 15,
    marginTop: 15
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
    fontSize: 15,
    lineHeight: 19
  },
  campDescName: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 17,
    paddingBottom: 10
  },
  comments: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 14,
    marginLeft: 15,
    paddingTop: 12
  },
  comments: {
    marginLeft: 15,
    paddingTop: 15
  },
  timeText: {
    color: "#929292",
    fontSize: 10,
    marginLeft: 15,
    marginTop: 10
  },
  readMore: {
    color: '#929292'
  },
  urgencyBarText: { 
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    color: 'black'
  }
};
