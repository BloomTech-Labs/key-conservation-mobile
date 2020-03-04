import { StyleSheet, Dimensions } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  arrowView: {
    padding: '2.5%',
    top: '2.5%',
    alignSelf: 'flex-start',
    left: '1.5%'
  },
  obBody: {
    flex: 1,
    padding: '4%',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  image: {
    height: Dimensions.get('screen').height * 0.5
  },
  titleTexts: {
    bottom: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width * 0.5
  },
  obText: {
    color: '#24392A',
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
    lineHeight: 25,
    marginTop: '20%',
    width: Dimensions.get('screen').width * 0.45
  },
  obTitle: {
    marginTop: '15%',
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'Lato-Bold',
    fontSize: responsiveFontSize(3.2),
    lineHeight: 38
  },
  buttons: {
    bottom: Dimensions.get('screen').height * 0.2,
    margin: '2%'
  },
  buttonTouch: {
    flex: 0,
    width: Dimensions.get('screen').width * 0.95,
    maxWidth: 350,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#24392A',
    fontFamily: 'Lato-Bold',
    fontSize: responsiveFontSize(2)
  },
  white: { backgroundColor: '#F5F5F5' },
  green: { backgroundColor: '#00FE9D' }
});
