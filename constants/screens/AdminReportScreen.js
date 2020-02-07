import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 1,
    backgroundColor: "rgb(242,242,251)",
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
    margin: 8,
    marginBottom: 24
  },
  tabSelector: {
    width: "100%",
    flexDirection: "row",
    height: 32,
    alignItems: "center",
    justifyContent: "space-between"
  },
  pageSelector : {
    // flex: 1,
    height: 48,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  pageNumber : {
    flex: 1,
    textAlign: 'center'
  },
  pageControl: {
    width: 20,
    flex: 1,
  },
  tab: {
    flex: 1,
    paddingTop: 4,
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