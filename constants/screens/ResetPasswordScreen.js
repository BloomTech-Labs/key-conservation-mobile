import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 1,
    paddingTop: 34,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2c3e50',
    maxHeight: 88
  },
  backButton: {
    paddingLeft: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnText: {
    paddingLeft: 4,
    color: 'white',
    fontSize: 16
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  headerLeft: {
    flex: 1,
    paddingHorizontal: 8
  },
  headerRight: {
    flex: 1,
    paddingHorizontal: 8
  },
  content: {
    borderWidth: 1,
    flex: 1,
    zIndex: -1,
    padding: 20,
    backgroundColor: 'white'
  },
  headingText: {
    fontFamily: 'Lato-Bold',
    fontSize: 24,
    marginVertical: 16
  },
  inputField: {
    flex: 1,
    flexDirection: 'row'
  },
  inputField: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginVertical: 15
  },
  input: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
    flex: 1,
    height: 50,
    backgroundColor: '#F5F5F5',
    fontWeight: 'bold',
    borderRadius: 7,
    color: '#333333',
    marginLeft: 10,
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    borderRadius: 7,
    justifyContent: 'center'
  },
  button: {
    fontFamily: 'Lato-Bold',
    fontStyle: 'normal',
    textAlign: 'center',
    color: 'black',
    fontSize: 18
  }
});