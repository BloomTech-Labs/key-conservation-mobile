import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  titleSection: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    paddingLeft: 10
  },
  iconSection: {
    // borderColor: 'red',
    // borderWidth: 2,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconWrap: {
    borderColor: 'red',
    borderWidth: 2,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  envelope: {
    // borderColor: 'red',
    // borderWidth: 2,
    padding: 20
  }
});
