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
    //width: '80%',
    //marginTop: 15,
    //marginLeft: 35,
    padding: 10,
    justifyContent: 'center'
    //bottom: 0
  },
  iconWrap: {
    borderColor: 'red',
    borderWidth: 2,
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: 2,
    paddingBottom: 20
  }
});
