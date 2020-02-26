import { StyleSheet, Dimensions } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  obBody: {
    flex: 1,
    justifyContent: 'center',
    height: Dimensions.get('window').height * 0.9
  },
  arrowView: {
    zIndex: 3,
    padding: '2.5%',
    top: '3%',
    alignSelf: 'flex-start',
    left: '1.5%'
  },
  obBorderView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  obTitle: {
    color: '#000000',
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
    fontSize: responsiveFontSize(3.6),
    lineHeight: 38,
    paddingTop: '30%',
    height: Dimensions.get('window').height * 0.5,
    width: Dimensions.get('window').width * 0.6,
    borderRadius: 180
  },
  buttons: {
    flex: 0,
    alignItems: 'flex-end'
  }
});
