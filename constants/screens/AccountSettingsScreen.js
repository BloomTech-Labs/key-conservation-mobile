import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  // in headerLeft
  backArrowTouch: {
    zIndex: 300,
    padding: 12,
    color: '#fff',
  },
  scrollBG: {
    backgroundColor: '#F2F2FB',
    height: Dimensions.get('screen').height * 0.9,
    width: Dimensions.get('screen').width,
  },
  title: {
    color: 'crimson',
    fontFamily: 'Lato-Bold',
    fontSize: 15,
    padding: 16,
    paddingBottom: 0,
  },
  sections: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    fontSize: 15,
  },
  iconWrap: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: Dimensions.get('screen').width * 0.05,
    justifyContent: 'center',
  },
  linkWrap: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
  },
  logoutButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  linkText: {
    fontSize: 20,
    alignSelf: 'center',
    marginLeft: '2%',
    fontFamily: 'Lato-Bold',
    color: '#323338',
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
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Lato-Bold',
    letterSpacing: 0.8,
    textAlign: 'center',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
  },
});

export default styles;
