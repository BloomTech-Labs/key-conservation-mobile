import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    backgroundColor: 'white',
    marginVertical: 8,
    paddingBottom: 24,
    overflow: 'hidden'
  },
  loading: {
    zIndex: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white'
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  backButton: {
    padding: 8,
    paddingRight: 16
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 22
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  inputError: {
    borderColor: '#ff0000'
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    marginBottom: 15,
    color: '#333333',
    paddingHorizontal: 10,
    borderColor: '#eaeaea',
    borderWidth: 1
  },
  buttonContainer: {
    backgroundColor: '#00FF9D',
    paddingVertical: 12,
    marginBottom: 7,
    borderRadius: 7,
    justifyContent: 'center'
  },
  buttonContainerInset: {
    borderColor: '#00FF9D',
    borderWidth: 2,
    paddingVertical: 12,
    marginBottom: 7,
    borderRadius: 7,
    justifyContent: 'center'
  },
  buttonInset: {
    textAlign: 'center',
    color: '#00FF9D',
    fontWeight: '400',
    fontSize: 20
  },
  button: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '400',
    fontSize: 20
  },
  noAccount: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  signUpContainer: {},
  signUp: {
    color: 'dodgerblue'
  }
});
