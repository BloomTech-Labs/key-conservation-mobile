import { StyleSheet, Dimensions } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  arrowView: {
    zIndex: 3,
    padding: '2.5%',
    top: '2.5%',
    alignSelf: 'flex-start',
    left: '1.5%'
  },
  obBody: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.9
  },
  obTitle: {
    flex: 0,
    color: '#000000',
    fontFamily: 'Lato-Bold',
    fontSize: responsiveFontSize(3.4),
    lineHeight: 38,
    marginHorizontal: '7%',
    marginTop: '15%',
    marginBottom: '5%'
  },
  highlight: {
    backgroundColor: '#f66767'
  },
  contentWrapper: {
    flex: 0,
    marginHorizontal: '7%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    margin: '3%',
    justifyContent: 'flex-start'
  },
  iconWrapper: {
    marginTop: '3%'
  },

  obText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    color: '#000000',
    fontFamily: 'Lato',
    fontSize: responsiveFontSize(2.4),
    lineHeight: 25,
    marginLeft: '3%',
    marginBottom: '2%',
    marginTop: '2%'
  },
  obTextBottom: {
    marginBottom: '7%'
  },
  buttons: {
    flex: 0,
    alignItems: 'flex-end'
  }
});
