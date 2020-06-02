import { StyleSheet, Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  urgencyBar: {
    top: 0,
    left: 0,
    height: 37,
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  urgencyBarText: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    letterSpacing: 5,
    color: 'white',
  },
  campImgContain: {
    /* Must have a Width && Height or it won't display anything! */
    width: '100%',
    flex: 1,
    height: deviceWidth,
    marginTop: 0,
  },
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
