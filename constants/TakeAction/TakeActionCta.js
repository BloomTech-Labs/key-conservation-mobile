import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  buttonContainer: {
    // borderColor: 'red',
    // borderWidth: 2,
    flex: 1,
    padding: 15,
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15
  },
  buttonTouch: {
    width: '97%',
    height: 48,
    backgroundColor: '#DBDBDB',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    fontSize: 18,
    textAlign: 'center',
    shadowColor: '#3b3b3b',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.4,
    shadowRadius: 16.0
  },
  text: {
    color: '#323339',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: 10,
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Lato-Bold'
  }
});
