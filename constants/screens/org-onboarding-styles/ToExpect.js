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
    alignItems: 'center',
    height: 720,
  },
  obTitle: {
    color: '#000000',
    fontFamily: 'Lato-Bold',
    // fontSize: 28,
    fontSize: responsiveFontSize(3),
    lineHeight: 38,
    marginLeft: '8%',
    marginTop: '5%',
    marginBottom: '2%',
    marginRight: '7%',
  },
  contentWrapper: {
    display: 'flex',
    marginLeft: '8%',
    marginRight: '5%',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    marginTop: '5%',
  },
  iconWrapper: {
    marginTop: '2.5%',
  },
  obSubtitle: {
    color: '#000000',
    fontFamily: 'Lato-Bold',
    // fontSize: 21,
    fontSize: responsiveFontSize(2.7),
    lineHeight: 29,
    marginLeft: '5%',
    marginTop: '2%',
    marginBottom: '2%',
    marginRight: '7%',
  },
  obText: {
    color: '#000000',
    fontFamily: 'Lato',
    // fontSize: 18,
    fontSize: responsiveFontSize(2),
    lineHeight: 25,
    marginLeft: '5%',
    marginTop: '2%',
    marginBottom: '2%',
    marginRight: '7%',
  },
  buttons: {
    alignItems: 'flex-end',
    backgroundColor: '#fff',
  },
});
