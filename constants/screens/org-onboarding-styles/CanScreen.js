import { StyleSheet, Dimensions } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
  },
  arrowView: {
    zIndex: 3,
    padding: '2.5%',
    top: '2.5%',
    alignSelf: 'flex-start',
    left: '1.5%',
  },
  obBody: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  obTitle: {
    flex: 0,
    color: '#000000',
    fontFamily: 'Lato-Bold',
    fontSize: responsiveFontSize(3.4),
    lineHeight: 38,
    marginHorizontal: '7%',
    marginTop: '10%',
    marginBottom: '5%',
  },
  highlight: {
    backgroundColor: '#D7FF43',
  },
  contentWrapper: {
    flex: 0,
    marginHorizontal: '7%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  iconWrapper: {
    marginTop: '3%',
  },
  obText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000000',
    fontFamily: 'Lato',
    fontSize: responsiveFontSize(2.4),
    lineHeight: 25,
    margin: '3%',
  },
  buttons: {
    flex: 0,
    alignItems: 'flex-end',
  },
});
