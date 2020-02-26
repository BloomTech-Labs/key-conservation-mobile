import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  buttonContainer: {
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
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 10
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
