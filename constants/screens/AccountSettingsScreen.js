import { StyleSheet, Dimensions } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  // in headerLeft
  backArrow: {
    zIndex: 3,
    flex: 0,
    //alignSelf: 'flex-start',
    padding: 20
  },
  scrollBG: {
    backgroundColor: '#F2F2FB',
    height: '100%'
  },
  touchableView: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 35
  },
  sections: {
    marginTop: 8,
    backgroundColor: '#fff',
    width: '100%',
    marginLeft: 8,
    marginRight: 8,
    padding: 25,
    borderRadius: 5,
    fontSize: 15
  },
  title: {
    fontSize: responsiveFontSize(2),
    alignSelf: 'center',
    marginLeft: 15,
    fontFamily: 'Lato-Bold',
    color: '#323338'
  },
  iconWrap: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 2,
    paddingBottom: 20
  },
  linkWrap: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: '7%'
  },
  linkText: {
    fontSize: responsiveFontSize(1.8),
    alignSelf: 'center',
    marginLeft: '4%',
    fontFamily: 'Lato-Bold',
    marginTop: '4%',
    color: '#323338'
  },
  logoutButton: {
    marginTop: '5%',
    width: 40,
    height: 40
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
