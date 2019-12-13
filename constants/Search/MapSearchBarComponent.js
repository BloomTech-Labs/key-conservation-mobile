export default {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 1,
    paddingLeft: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  searchContainer: {
    backgroundColor: "#C1CCD9",
    borderWidth: 1,
    borderColor: "#A6AFBA",
    borderRadius: 6,
    padding: 4
  },
  searchInputContainer: {
    flexDirection: "row",
    backgroundColor: "#C1CCD9",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: "100%",
    paddingRight: 4
  },
  selectionRow: {
    justifyContent: "center",
    fontSize: 24,
    fontWeight: "700",
    backgroundColor: "#C1CCD9",
    paddingTop: 0,
    paddingRight: 2,
    paddingLeft: 2,
    alignSelf: "stretch",
    display: "none"
  },
  searchInput: {
    flex: 1,
    padding: "3%",
    color: "#2B3036",
    backgroundColor: "white",
    fontSize: 16,
    height: 50,
    fontWeight: "500",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#A6AFBA"
  },
  dropDownArrow: {
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A0CA28",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    marginLeft: 2,
    borderWidth: 1,
    borderColor: "#A6AFBA"
  },

  filterSelectOption: {
    alignItems: "center",
    justifyContent: "flex-start",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#eee",
    padding: 8,
    marginBottom: 4,
    borderRadius: 4
  },
  filterOption: {
    color: "#444",
    fontWeight: "500",
    fontSize: 16
  },
  selectionRowHeader: {
    color: "white",
    fontSize: 16,
    fontWeight: "800",
    backgroundColor: "#737373",
    padding: 6,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    borderRadius: 4,
    marginBottom: 4,
    alignSelf: "stretch"
  },
  clearButton: {
    position: "absolute",
    right: 70,
    top: 20
  },
  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: "#A0CA28",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderWidth: 1,
    borderColor: "#A6AFBA"
  },
  keyInput: {
    padding: "5%",
    backgroundColor: "yellow",
    fontSize: 20
  },
  messageContainer: {
    paddingTop: 6,
    paddingBottom: 6,
    marginRight: 2,
    marginLeft: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#404040",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  },

  messageText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600"
  },

  show: {
    display: "flex"
  },
  hide: {
    display: "none"
  }
};
