import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 2,
    marginTop:240,
  },
  itemContainers: {
    width: '95%',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop:10,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 10,
  },
  fullWidthButtonContainer: {
    padding: 15,
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
  },
  fullWidthButton: {
    width: '95%',
    flex: 1,
    height: 48,
    backgroundColor: '#31ffa5',
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
  buttonText: {
    color: '#323339',
    textTransform: 'uppercase',
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
  },
});
