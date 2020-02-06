import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(242,242,251)",
    // height: '100%'
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    marginHorizontal: 8
  },
  section: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    margin: 8
  },
  tabSelector: {
    width: "100%",
    flexDirection: "row",
    height: 32,
    alignItems: "center",
    justifyContent: "space-between"
  },
  tab: {
    flex: 1,
    height: "100%",
    alignItems: "center"
  },
  tabText: {
    flex: 1,
    letterSpacing: 0.7,
    fontSize: 17
  },
  reportList: {
    flex: 1,
    padding: 12,
    flexDirection: "column"
  },
  selectedTab: {
    width: "100%",
    backgroundColor: "#00FF9D",
    height: 3
  }
});