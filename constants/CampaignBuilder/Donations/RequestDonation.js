import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  itemContainers: {
    flexDirection: 'column',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
  },
  itemTitleRow: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    paddingLeft: 5,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  itemTitleText: {
    fontSize: 17,
    marginLeft: 7,
    textAlign: 'left',
    fontFamily: 'Lato-Bold',
    alignSelf: 'center',
  },
  switchContainer: {
    marginLeft: 'auto',
  },
  itemContentBody: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 5,
  },
});
