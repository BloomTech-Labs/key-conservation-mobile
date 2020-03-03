import { StyleSheet, Dimensions } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  obBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.9
  },
  obBorderView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 360,
    top: '8%'
  },
  obTitle: {
    color: '#000000',
    fontFamily: 'Lato-Bold',
    fontSize: responsiveFontSize(4),
    lineHeight: 38,
    marginLeft: '15%',
    marginBottom: '12%',
    marginRight: '15%',
    marginHorizontal: '15%'
  },
  obSubtitle: {
    color: '#000000',
    fontFamily: 'Lato-Bold',
    fontSize: responsiveFontSize(3.3),
    lineHeight: 30,
    marginBottom: '9%',
    marginLeft: '15%',
    marginRight: '6%'
  },

  obText: {
    color: '#000000',
    fontFamily: 'Lato-Bold',
    fontSize: responsiveFontSize(2.3),
    lineHeight: 27
  },

  arrowView: {
    zIndex: 3,
    padding: '2.5%',
    top: '2.5%',
    alignSelf: 'flex-start',
    left: '1.5%'
  },

  buttons: {
    flex: 0,
    alignItems: 'flex-end'
  }
});
