import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  tabBar: {
    flexDirection: 'row'
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
