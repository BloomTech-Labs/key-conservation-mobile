import { StyleSheet, Dimensions } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import * as Font from 'expo-font';
Font.loadAsync({
  'lato-regular-italic': require('../../../assets/fonts/Lato/Lato-RegularItalic.ttf')
  //   'lato-bold-italic': require('../../../assets/fonts/Lato/Lato-BoldItalic.ttf')
});

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  header: {
    flex: 0,
    padding: '2.5%',
    top: '2.5%',
    flexDirection: 'row'
  },
  arrowView: {
    padding: '2.5%',
    top: '2.5%',
    alignSelf: 'flex-start',
    left: '1.5%'
  },
  progressBar: {
    width: '75%',
    alignSelf: 'center',
    padding: '7%',
    top: '5%',
    right: '20%'
  },
  progressBarText: {
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: responsiveFontSize(1.8),
    paddingTop: 4
  },
  imageContainer: {
    flex: 1,
    alignSelf: 'center',
    height: Dimensions.get('screen').height * 0.25
  },
  keyboardView: {
    marginVertical: '3%',
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },

  obBody: {
    flex: 1,
    backgroundColor: 'white',
    padding: '4%'
  },
  obTitle: {
    color: '#000000',
    fontFamily: 'Lato-Bold',
    fontSize: responsiveFontSize(3.4),
    lineHeight: 38,
    marginLeft: '5%',
    marginTop: '2%',
    marginBottom: '2%',
    marginRight: '7%',
    bottom: 140,
    left: 26
  },
  obText: {
    fontFamily: 'Lato',
    fontSize: responsiveFontSize(2.4),
    lineHeight: 25,
    marginLeft: '5%',
    marginVertical: '5%'
  },
  italic: {
    fontFamily: 'lato-regular-italic'
  },
  bold: {
    fontFamily: 'Lato-Bold'
  },
  obSubtitle: {
    color: '#000000',
    fontFamily: 'Lato-Bold',
    fontSize: responsiveFontSize(2.8),
    lineHeight: 29,
    marginLeft: '5%',
    marginRight: '7%',
    marginLeft: '5%',
    marginRight: '5%',
    lineHeight: 50
  },
  inputBlock: {
    marginBottom: 20
  },
  inputBlockSm: {
    marginBottom: 10
  },
  textArea: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    paddingBottom: 10,
    fontFamily: 'Lato',
    fontSize: responsiveFontSize(2.1),
    lineHeight: 25,
    color: '#293C34'
  },
  textAreaSm: {
    height: 47,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: 'Lato',
    fontSize: responsiveFontSize(2.1),
    lineHeight: 25,
    color: '#293C34'
  },
  buttons: {
    alignItems: 'flex-end',
    padding: 0
  }
});
