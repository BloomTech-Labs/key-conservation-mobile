export default {
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 29,
    flexWrap: "wrap",
    borderColor: "green",
    borderWidth: 3
  },
  avatarContainer: {
    width: "30%",
    flex: 0,
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1
  },
  bioContainer: {
    marginTop: 25,
    marginBottom: 25,
    width: "80%",
    textAlign: "center",
    alignItems: "center"
  },
  bio: {
    color: "white"
  },
  org: {
    lineHeight: 22,
    fontSize: 16,
    fontFamily: "OpenSans-Bold",
    color: "white"
  },
  outline: {
    fontSize: 15,
    color: "white"
  },
  locationText: {
    flexDirection: "row",
    lineHeight: 19,
    fontSize: 14,
    fontFamily: "OpenSans-Regular",
    color: "white"
  },
  userText: {
    lineHeight: 19,
    fontSize: 14,
    fontFamily: "OpenSans-Regular",
    color: "white"
  },
  websiteText: {
    lineHeight: 19,
    fontSize: 14,
    fontFamily: "OpenSans-SemiBold",
    color: "white"
  },
  pic: {
    flex: 1
  },
  textContainer: {
    flex: 1,
    // paddingTop: 2,
    // height: "50",
    alignItems: "center",
    color: "white"
    // borderColor: "#fff",
    // borderWidth: 1
  },
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

  CampaignButton: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    fontFamily: "OpenSans-SemiBold"
  },
  DetailButton: {
    fontSize: 18,
    color: "#C4C4C4",
    fontWeight: "bold",
    fontFamily: "OpenSans-SemiBold"
  }
};
