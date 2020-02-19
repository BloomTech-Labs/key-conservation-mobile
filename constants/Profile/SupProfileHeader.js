import { withTheme } from "react-native-elements";

export default {
  container: {
    height: 270,
    flexDirection: "column"
  },
  rightContainer: {
    flexDirection: "column"
  },
  leftContainer: {
    flex: 0,
    width: "30%",
    height: "40%",
    alignItems: "center"
  },
  textContainer: {
    paddingTop: 2,
    height: 61
  },
  titleText: {
    marginTop: 22,
    lineHeight: 22,
    fontSize: 20,
    fontFamily: "Lato-Bold",
    color: "white"
  },
  userText: {
    lineHeight: 19,
    fontSize: 16,
    fontFamily: "Lato",
    color: "white"
  },
  // socialContainer  : {
  // 	flexDirection  : 'row',
  // 	width          : 175,
  // 	marginTop      : 10,
  // 	marginLeft     : 3,
  // 	justifyContent : 'space-between',
  // },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomColor: "#f5f5f5",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 2
  },
  TouchableOpacity: {
    flex: 1
  },
  ButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#eee",
    marginTop: 12,
    marginBottom: 12,
    flex: 1
  },
  DetailButton: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    fontFamily: "Lato-Bold"
  },
  bioContainer: {
    paddingTop: 25,
    paddingHorizontal: 30,
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    paddingBottom: 15
  },
  bio: {
    textAlign: "center",
    color: "white",
    fontFamily: "Lato"
  },
  allContainer: {
    flexDirection: "row"
  },
  connectButton: {
    backgroundColor: "#05FF9D",
    width: "30%",
    borderRadius: 10,
    fontFamily: "Lato-Bold",
    marginTop: 20,
    marginRight: 20,
    marginBottom: 20,
    marginLeft: 20,
    alignSelf: "flex-end"
  },
  connectContainer: {
    flexDirection: "row",
    alignSelf: "center",
    paddingBottom: 30
  },
  connectText: {
    color: "white",
    marginRight: 30,
    borderRightColor: "white",
    borderRightWidth: 1,
    alignSelf: "center",
    paddingHorizontal: 45
  },
  textNumber: {
    color: "white",
    fontSize: 18,
    textAlign: "center"
  },
  textWord: {
    color: "white",
    textAlign: "center"
  }
};
