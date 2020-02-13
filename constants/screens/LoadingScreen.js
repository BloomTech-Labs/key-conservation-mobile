import { StyleSheet, Dimensions } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.width,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.height
  },
  logo: {
    width: 189,
    height: 189
  },
  text: {
    marginTop: 30,
    fontSize: 30,
    color: 'white',
    fontFamily: 'Lato-Bold',
    paddingBottom: 40
  },
  indicator: {
    marginTop: 50
  },
  touchableContainer: {
    width: 262,
    height: 55,
    borderRadius: 20,
    backgroundColor: '#d7ff43',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  touchableText: {
    fontFamily: 'Lato-Bold',
    letterSpacing: 2,
    fontStyle: 'normal',
    fontSize: 22,
    lineHeight: 25,
    color: '#000000'
  }
});

export default styles;
