import { StyleSheet } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
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
  }
});
