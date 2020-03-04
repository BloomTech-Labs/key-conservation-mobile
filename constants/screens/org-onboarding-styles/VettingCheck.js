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
    padding: '4%'
  },
  aroundImage: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'yellow',
    alignSelf: 'center',
    height: Dimensions.get('screen').height * 0.9,
    width: Dimensions.get('screen').width * 0.6
  },
  image: {
    // flex: 1,
    borderWidth: 2,
    borderColor: 'orange',
    alignSelf: 'center',
    height: Dimensions.get('screen').height * 0.4,
    width: Dimensions.get('screen').width * 0.8
  },
  titleTexts: {
    //   flex: 0,
    borderWidth: 2,
    borderColor: 'red',
    fontFamily: 'Lato'
  },
  obText: {
    // flex: 0,
    borderWidth: 2,
    borderColor: 'red',
    color: '#000000',
    fontFamily: 'Lato',
    fontSize: 18,
    lineHeight: 25
    // marginTop: '5%',
    // marginBottom: '10%',
  },
  obTitle: {
    borderWidth: 2,
    borderColor: 'red',
    color: '#000000',
    fontFamily: 'Lato-Bold',
    fontSize: 28,
    lineHeight: 38
  },
  button: {
    borderWidth: 2,
    borderColor: 'red',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTouch: {
    borderWidth: 2,
    borderColor: 'red',
    width: 282,
    height: 55,
    borderRadius: 20,
    backgroundColor: '#00FF9D',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  buttontext: {
    borderWidth: 2,
    borderColor: 'red',
    fontFamily: 'Lato-Bold',
    letterSpacing: 2,
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 25,
    color: '#000000'
  }
});
