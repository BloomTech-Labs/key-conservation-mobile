import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  inputError: {
    borderColor: '#ff0000'
  },
  inputField: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 15
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
    marginTop: 15,
    borderRadius: 7,
    justifyContent: 'center',
    shadowColor: 'gray',
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 1,
      height: 3
    }
  },
  button: {
    fontFamily: 'Lato-Bold',
    fontStyle: 'normal',
    textAlign: 'center',
    color: 'black',
    fontSize: 18
  },
  footnoteContainer: {
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  footnote: {
    fontFamily: 'Lato-Bold',
    color: 'gray'
  }
});
