import { StyleSheet, Dimensions } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import * as Font from 'expo-font';
Font.loadAsync({
  //   'lato-regular-italic': require('../../../assets/fonts/Lato/Lato-RegularItalic.ttf'),
  'lato-bold-italic': require('../../../assets/fonts/Lato/Lato-BoldItalic.ttf')
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

  obBody: {
    flex: 1,
    backgroundColor: 'white',
    padding: '4%'
  },
  borderContainer: {
    // borderWidth: 2,

    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 30,
    borderColor: '#313639',
    borderWidth: 1
  },

  noBorderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: '5%',
    marginRight: '5%'
  },
  obText: {
    color: '#000000',
    fontFamily: 'Lato',
    fontSize: 18,
    lineHeight: 25,
    margin: '5%'
    // marginBottom: '2%',
    // marginRi: '7%'
  },
  obTitle: {
    color: '#000000',
    fontFamily: 'Lato-Bold',
    fontSize: 28,
    lineHeight: 38,
    marginLeft: '5%',
    marginTop: '13%',
    marginBottom: '2%',
    marginRight: '7%',
    alignSelf: 'center',
    bottom: '90%'
  },
  obUploadBtn: {
    width: 90,
    height: 90,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  obSubtitle: {
    color: '#313639',
    fontFamily: 'Lato-Bold',
    fontSize: 21,
    lineHeight: 29,
    marginLeft: '5%',
    marginTop: '2%',
    marginBottom: '2%',
    marginRight: '7%'
  },
  buttons: {
    alignItems: 'flex-end',
    padding: 0
  }
});
