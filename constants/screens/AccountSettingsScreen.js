import { StyleSheet, Dimensions } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  // in headerLeft
  backArrowTouch: {
    zIndex: 300,
    padding: 12,
    color: '#fff'
  },
  scrollBG: {
    backgroundColor: '#F2F2FB',
    height: Dimensions.get('screen').height * 0.9,
    width: Dimensions.get('screen').width
  },
  sections: {
    margin: Dimensions.get('screen').width * 0.02,
    backgroundColor: '#fff',
    padding: Dimensions.get('screen').width * 0.04,
    borderRadius: 5,
    fontSize: 15
  },
  iconWrap: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: Dimensions.get('screen').width * 0.02
  },
  title: {
    fontSize: responsiveFontSize(2),
    alignItems: 'center',
    marginLeft: 15,
    fontFamily: 'Lato-Bold',
    color: '#323338'
  },
  linkWrap: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: Dimensions.get('screen').width * 0.02,
    marginTop: 15
  },
  logoutButton: {
    backgroundColor: '#F2F2FB',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5
  },
  linkText: {
    fontSize: responsiveFontSize(2.3),
    alignSelf: 'center',
    marginLeft: '4%',
    fontFamily: 'Lato-Bold',
    marginTop: '4%',
    color: '#323338'
  },
  buttonContainer: {
    width: '30%',
    height: 30,
    marginTop: 10,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    marginLeft: '35%',
    marginRight: '35%',
    borderRadius: 4,
    backgroundColor: '#00FF9D',
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: 'Lato-Bold',
    letterSpacing: 0.8,
    textAlign: 'center',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16
  }
});

export default styles;
