import { StyleSheet } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  obBody: {
    flex: 1,
    justifyContent: 'center'
  },
  arrowView: {
    zIndex: 3,
    padding: '2.5%',
    top: '3%',
    alignSelf: 'flex-start',
    left: '1.5%'
  },
  obBorderView: {
    flexGrow: 1,
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: '5%',
    marginBottom: '20%',
    paddingBottom: '5%',
    marginLeft: '3%',
    marginRight: '2%'
  },
  obTitle: {
    color: '#000000',
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
    fontSize: responsiveFontSize(3.8),
    // fontSize: 28,
    lineHeight: 38,
    marginLeft: '15%',
    marginTop: '45%',
    marginBottom: '3%',
    marginRight: '15%',
    height: '40%'
  },
  spacer: {
    flexGrow: 2
  },
  buttons: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
});
