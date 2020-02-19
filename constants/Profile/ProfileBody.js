import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  tabBar: {
    flexDirection: 'row'
  },
  tabItem: {
    //fontFamily: 'Lato',
    flex: 1,
    alignItems: 'center',
    color: 'black',
    borderBottomWidth: 4,
    borderBottomColor: 'white',
    padding: 12,
    backgroundColor: '#FFF'
  }
});
