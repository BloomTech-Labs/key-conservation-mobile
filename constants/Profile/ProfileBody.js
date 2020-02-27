import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  tabBar: {
    left: 0,
    right: 0,
    zIndex: 100,
    flexDirection: 'row',
    position: 'absolute'
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    color: 'black',
    borderBottomWidth: 3,
    borderBottomColor: 'white',
    padding: 12,
  }
});
