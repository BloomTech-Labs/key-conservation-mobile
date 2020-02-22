import { StyleSheet } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  obBody: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  obBorderView: {
    alignSelf: 'center',
    borderRadius: 360,
    marginTop: '15%',
    marginHorizontal: '10%',
    height: '55%'
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
    lineHeight: 27,
    marginBottom: '9%',
    marginLeft: '15%',
    marginRight: '6%'
  },

  arrowView: {
    zIndex: 3,
    padding: '2.5%',
    top: '2.5%',
    alignSelf: 'flex-start',
    left: '1.5%'
  },

  buttons: {
    flexGrow: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  spacer: {
    flexGrow: 2
  }
});
