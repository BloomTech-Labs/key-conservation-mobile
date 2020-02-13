import { StyleSheet, Dimensions } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 189,
    height: 189
  },
  text: {
    fontSize: responsiveFontSize(3.5),
    color: 'white',
    fontFamily: 'Lato-Bold',
    paddingBottom: 18
  },
  indicator: {
    marginTop: 50
  },
  logoutContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchableContainer: {
    width: Dimensions.get('screen').width * 0.92,
    height: Dimensions.get('screen').height * 0.05,
    borderRadius: 8,
    backgroundColor: '#d7ff43',
    alignItems: 'center',
    justifyContent: 'center'
    //flexDirection: 'column'
  },
  touchableText: {
    fontFamily: 'Lato-Bold',
    //letterSpacing: 2,
    fontStyle: 'normal',
    fontSize: responsiveFontSize(2),
    lineHeight: 25,
    color: '#000000'
  }
});

export default styles;
