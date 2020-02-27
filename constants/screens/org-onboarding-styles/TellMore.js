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
  keyboardView: {
    marginVertical: '3%',
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
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
  obBody: {
    flex: 1,
    backgroundColor: 'white',
    padding: '4%'
  },
  obText: {
    fontFamily: 'Lato-Bold',
    fontSize: responsiveFontSize(2.1),
    lineHeight: 25,
    marginLeft: '5%',
    marginVertical: '5%'
  },
  obTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: responsiveFontSize(3),
    lineHeight: 38,
    marginLeft: '5%',
    marginTop: '8%',
    marginBottom: '2%',
    marginRight: '7%'
  },
  italic: {
    fontFamily: 'lato-bold-italic'
  },
  obFieldName: {
    borderWidth: 2,
    fontFamily: 'Lato-Bold',
    fontSize: responsiveFontSize(1.8),
    lineHeight: 19,
    color: '#000000',
    marginLeft: '5%',
    marginVertical: '3%'
  },
  aroundInput: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  placeholderText: {
    alignSelf: 'flex-start',
    fontFamily: 'Lato-Bold',
    fontSize: responsiveFontSize(2.1),
    paddingLeft: '3%',
    top: '2.5%'
  },
  obTextInput: {
    fontFamily: 'Lato',
    fontSize: responsiveFontSize(2.5),
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    height: 50,
    width: '60%',
    paddingLeft: '3%'
  },
  questionMark: {
    justifyContent: 'flex-end'
    // marginLeft: 10,
    // marginTop: 3
  },
  // ******* Switch Styles below  ********
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50
  },
  obSwitchButton: {
    marginLeft: '5%'
  },
  obSwitchLabel: {
    flex: 1,
    margin: 0,
    padding: 0,
    fontFamily: 'Lato-Bold',
    fontSize: responsiveFontSize(2.1),
    margin: '3%'
  },

  // ******* CountryPicker Styles below  ********
  countryPickerContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    height: 50
  },
  countryTitleContainer: {
    // borderWidth: 2
    // padding: '2%'
  },
  countryPickerTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: responsiveFontSize(2.2),
    flex: 1,
    padding: '3%'
  },
  countryComponentSpacer: {
    height: 46,
    width: '64%'
  },
  countryComponentContainer: {
    flex: 0,
    width: '180%',
    alignSelf: 'center',
    top: 10
  },
  countryChevronContainer: {
    zIndex: -5,
    alignSelf: 'flex-start',
    paddingVertical: '3.3%',
    paddingLeft: '3.3%'
  },
  chevron: {
    transform: [{ rotateZ: '180deg' }]
  },
  listContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start'
  },
  // ******* Next Button container Styles below  ********
  buttons: {
    alignItems: 'flex-end',
    padding: 0
  }
});
