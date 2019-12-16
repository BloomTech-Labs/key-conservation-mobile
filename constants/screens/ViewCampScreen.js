import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;

export default {
  touchableButton: {
    paddingTop: 25,
    paddingBottom: 25,
    width: "100%",
    height: 50,
    alignItems: "center"
  },
  touchableView: {
    backgroundColor: "#00FF9D",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 48,
    width: 243
  },
  touchableText: {
    fontFamily: "Futura-Bold",
    color: "#323338",
    textTransform: "uppercase",
    letterSpacing: 2,
    fontSize: 16
  },
  donateButton: {
    width: "60%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  supportMissionText: {
    fontFamily: "Futura",
    fontSize: 14,
    paddingLeft: 10
  },
  campMissionText: {
    fontFamily: "Futura",
    fontSize: 14,
    lineHeight: 19,
    paddingTop: 10,
    textAlign: "center"
  },
  commentsView: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: 14,
    marginTop: 20,
    paddingTop: 19,
    paddingBottom: 19,
    borderTopWidth: 2,
    borderTopColor: "#eee",
    borderBottomWidth: 2,
    borderBottomColor: "#eee"
  },
  campMission: {
    marginLeft: 15,
    marginRight: 15,
    width: deviceWidth / 2,
    fontFamily: "Futura",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    marginTop: 20,
    paddingTop: 19
  },
  campImgContain: {
    /* Must have a Width && Height or it won't display anything! */
    // resizeMode: 'contain',
    // height: deviceWidth <= 415 ? deviceWidth : 415
    flex: 1,
    height: deviceWidth,
    width: deviceWidth
  },
  campDescContain: {
    marginLeft: 15,
    paddingTop: 15,
    marginRight: 15
  },
  campDescName: {
    fontFamily: "Futura-Bold",
    fontSize: 17,
    lineHeight: 22,
    paddingBottom: 10
  },
  campDesc: {
    fontFamily: "Futura-Bold",
    fontSize: 15,
    lineHeight: 19
  },
  listUsername: {
    fontFamily: "Futura-Bold",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "bold"
  },
  donateView: {
    alignItems: "center",
    marginBottom: 50
  },
  whiteSpace: {
    height: 40
  },
  icon: {
    fontSize: 28,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  hearts: {
    marginHorizontal: 15
  },
  heartOutline: {
    fontSize: 28,
    color: "black"
  },
  heartFill: {
    fontSize: 30,
    color: "#e60024"
  },
  bookmarks: {
    marginHorizontal: 15
  },
  bookmarkOutline: {
    fontSize: 28,
    color: "black"
  },
  bookmarkFill: {
    fontSize: 30,
    color: "#00FF9D"
  },
  timeText: {
    color: "#929292",
    fontSize: 10,
    marginLeft: 0,
    marginRight: 15,
    marginTop: 15
  }
};
