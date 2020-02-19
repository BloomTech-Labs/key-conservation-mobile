import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  tabItem: {
    fontFamily: 'Lato',
    flex: 1,
    alignItems: 'center',
    color: 'black',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    padding: 16,
    backgroundColor: '#F2F2FB'
  }
});
