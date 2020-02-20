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
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconWrap: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  envelope: {
    padding: 20
  }
});
