import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    height: 215,
    width: 215
  },
  logoContainer: {
    flex: 0.85,
    flexShrink: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 5
  },
  titleContainer: {
    flex: 0,
    paddingBottom: 25,
    alignItems: 'center'
  },
  selectTitle: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Lato-Bold',
    color: 'white'
  },
  highlight: {
    textAlign: 'center',
    flexWrap: 'wrap',
    marginTop: 3,
    fontSize: 30,
    fontFamily: 'Lato-Bold',
    color: 'black',
    backgroundColor: '#d7ff43'
  },
  selectText: {
    alignItems: 'center',
    marginTop: 30,
    fontSize: 20,
    flexWrap: 'wrap',
    fontFamily: 'Lato',
    color: 'white'
  },
  buttons: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    width: '90%'
  },
  buttonContainer: {
    width: '90%',
    height: 50,
    marginBottom: 18,
    borderRadius: 5,
    fontFamily: 'Lato',
    backgroundColor: '#F4F5F7',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: 'Lato-Bold',
    letterSpacing: 0,
    textAlign: 'center',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20
  },
  aboutIconContainer: {
    alignSelf: 'flex-start',
    width: '90%',
    margin: 24
  },
  aboutIconTouch: {
    padding: 10
  },
  Hidden: {
    display: 'none'
  },
  formView: {
    flex: 1,
    position: "absolute",
    zIndex: 1,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  keyboardAvoidingView: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
    height: '100%',
    minHeight: 100,
    maxHeight: 480
  }
});
