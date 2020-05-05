import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  buttonContainer: {
    // borderColor: 'red',
    // borderWidth: 1,
    marginTop: 3.5,
    flex: 1,
    padding: 15,
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
  },
  buttonTouch: {
    width: '100%',
    height: 48,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    textAlign: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 10,
  },
  text: {
    color: '#323339',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
  },
});
